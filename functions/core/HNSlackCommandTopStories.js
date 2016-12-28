/**
 * @param params
 * @param params.command
 * @param params.text
 * @param params.response_url
 * @param params.serverlessup_host
 * @param params.serverlessup_token
 * @param callback
 */
function run(params, callback) {
	if (! params.serverlessup_host) {
        getAndCacheTopStories(params, callback);
	}
	else {
        var startIndex = 0;
        if (params.startIndex) {
            startIndex = params.startIndex;
        }
        var cacheKey = 'top' + startIndex;
		getCachedValue(params.serverlessup_host, params.serverlessup_token, cacheKey, (err, statusCode, value) => {
            if (err || ! value) {
                getAndCacheTopStories(params, callback);
            }
            else {
                sendTopStoriesToSlack(value, params, callback);
            }
        });
	}
}

function getAndCacheTopStories(params, callback) {
    var startIndex = 0;
    if (params.startIndex) {
        startIndex = params.startIndex;
    }
	getHackerNewsTopStories(startIndex, 10, (err, stories) => {
		if (err) {
			sendErrorToSlack("Sorry, we are having trouble connecting to Hacker News right now!", params, callback);
		}
		else {
			if (! params.serverlessup_host) {
                sendTopStoriesToSlack(stories, params, callback);
            }
            else {
                var cacheKey = 'top' + startIndex;
                cacheValue(params.serverlessup_host, params.serverlessup_token, cacheKey, stories, 300, (err, statusCode) => {
                    if (err) {
                        console.log("Error saving stories to sup: " + err);
                    }
                    sendTopStoriesToSlack(stories, params, callback);
                });
            }
		}				
	});
}

function sendTopStoriesToSlack(stories, params, callback) {
    var startIndex = 0;
    if (params.startIndex) {
    	startIndex = params.startIndex;
	}
	var buttons =  {
        text: '',
        fallback: '',
        callback_id: 'hn_topstories_more',
        color: '#3AA3E3',
		attachment_type: 'default',
        actions: [{
            name: 'hn_topstories_more',
            text: 'Load More',
            type: 'button',
            value: startIndex + 10
        }]
    };
    var attachments = stories.concat(buttons);
	var slackCallbackUrl = decodeURIComponent(params.response_url)
	var slackPost = {
        delete_original: false,
        replace_original: false,
        text: "",
		attachments: attachments
	};
	console.log("Sending stories to Slack @ " + slackCallbackUrl);
	postToSlack(slackCallbackUrl, slackPost, (err, statusCode) => {
		if (err) {
			var response = { "error": "Error sending stories to Slack." };
			callback(null, response);
		}
		else {
			var response = {
				"text": "Stories sent to Slack.",
				"statusCode": statusCode,
				"slackPost": slackPost
			};
			callback(null, response);
		}
	});
}

function sendErrorToSlack(errorMessage, params, callback) {
	var slackCallbackUrl = decodeURIComponent(params.response_url)
	var slackPost = { text: errorMessage };
	console.log("Sending error message to Slack @ " + slackCallbackUrl);
	postToSlack(slackCallbackUrl, slackPost, (err, statusCode) => {
		if (err) {
			var response = { "error": "Error sending error message to Slack." };
			callback(null, response);
		}
		else {
			var response = { "text": "Error message sent to Slack.", "statusCode": statusCode };
			callback(null, response);
		}
	});
}

{% include "../lib/HackerNewsAPI.js" %}
{% include "../lib/ServerlessUpAPI.js" %}
{% include "../lib/SlackAPI.js" %}