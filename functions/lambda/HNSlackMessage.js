var config = require("./config.json");
var aws = require('aws-sdk');

exports.handler = (event, context, callback) => {
    run(event, (err, response, payload) => {
		if (! err) {
			var functionName;
            if (payload.actions[0].name == 'hn_topstories_more') {
                functionName = 'HNSlackCommandTopStories';
                event['command'] = '/hn';
                event['startIndex'] = Number(payload.actions[0].value);
                event['response_url'] = payload.response_url;
            }
			var lambda = new aws.Lambda();
			var lambdaParams = {
  				FunctionName: functionName,
  				Payload: JSON.stringify(event),
				InvocationType: 'Event'
			};
			lambda.invoke(lambdaParams, (error, data) => {
				if (error) {
					console.log('Error calling lambda function: ' + error);
  				  	callback(null, { text: 'Sorry, we are experiencing issues right now!' });
  				}
  				else {
					console.log('Call to lambda function succeeded: ' + data);
  					callback(null, response);
				}
			});
		}
		else {
			callback(null, response);
		}
	});
};

{% include "../core/HNSlackMessage.js" %}