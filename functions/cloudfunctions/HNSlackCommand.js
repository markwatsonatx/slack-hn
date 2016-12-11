var config = require("./config.json");
var aws = require('aws-sdk');

exports.HNSlackCommand = (req, res) => {
    var params = {
		// TODO:
	};
	run(params, (err, response) => {
		if (! err) {
			var lambda = new aws.Lambda();
			var lambdaParams = {
  				FunctionName: 'HNSlackCommandHN',
  				Payload: JSON.stringify(event),
				InvocationType: "Event"
			};
			lambda.invoke(lambdaParams, (error, data) => {
				if (error) {
					console.log("Error calling lambda function: " + error);
  				  	res.status(200).send(JSON.stringify({ "text": "Sorry, we are experiencing issues right now!" }));
  				}
  				else {
					console.log("Call to cloud function succeeded: " + data);
                    res.status(200).send(JSON.stringify(response));
				}
			});
		}
		else {
			res.status(500).send(JSON.stringify(err));
		}
	});
};

{% include "../core/HNSlackCommand.js" %}