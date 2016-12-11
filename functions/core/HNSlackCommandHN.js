// $DefaultParam:serverlessup_host
// $DefaultParam:serverlessup_token

function run(params, callback) {
	var command = decodeURIComponent(params.command);
	if (command == "/hn") {
		// mw:TODO: parse command for topstories, ask, etc
		getTopStories(params, callback);
	}
	else {
		var response = { "error": "Invalid command '" + command + "'" };
		callback(null, response);
	}
}

function getTopStories(params, callback) {
	if (! params.serverlessup_host) {
        getAndCacheTopStories(params, callback);
	}
	else {
		getCachedValue(params.serverlessup_host, params.serverlessup_token, 'topstories', (err, statusCode, value) => {
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
	getHackerNewsTopStories(10, (err, stories) => {
		if (err) {
			sendErrorToSlack("Sorry, we are having trouble connecting to Hacker News right now!", params, callback);
		}
		else {
			if (! params.serverlessup_host) {
                sendTopStoriesToSlack(stories, params, callback);
            }
            else {
                cacheValue(params.serverlessup_host, params.serverlessup_token, 'topstories', stories, (err, statusCode) => {
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
	var slackCallbackUrl = decodeURIComponent(params.response_url)
	var slackPost = {
		text: "Here are the top Hacker News stories:",
		attachments: stories
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

function getNewStories(params) {
	
}

function getAskHN(params) {

}

function getJobs(params) {
	
}

{% include "../lib/HackerNewsAPI.js" %}
{% include "../lib/ServerlessUpAPI.js" %}
{% include "../lib/SlackAPI.js" %}