// $DefaultParam:serverlessup_host
// $DefaultParam:serverlessup_token

function main(params) {
    return new Promise((resolve, reject) => {
		run(params, (err, response) => {
			if (! err) {
				var whiskActionParams = {
					actionName: '/markwats@us.ibm.com_hn/HNSlackCommandHN',
					params: params,
					blocking: false
				};
				var ow = require('openwhisk')({ignore_certs: true});
				ow.actions.invoke(whiskActionParams)
					.then(function() {
                        console.log("Call to OpenWhisk action succeeded.");
                        resolve(response);
					})
					.catch(function(err) {
                        console.log("Error calling OpenWhisk action: " + err);
                        resolve({ "text": "Sorry, we are experiencing issues right now!" });
					});
			}
			else {
				reject(err);
			}
		});
    });
};

{% include "../core/HNSlackCommand.js" %}