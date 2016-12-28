// $DefaultParam:serverlessup_host
// $DefaultParam:serverlessup_token
// $DefaultParam:openwhisk_namespace

function main(params) {
    return new Promise((resolve, reject) => {
        run(params, (err, response, action) => {
			if (! err) {
				var actionName;
				if (action == 'top') {
                    actionName = '/HNSlackCommandTopStories'
				}
				var whiskActionParams = {
					actionName: params.openwhisk_namespace + actionName,
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