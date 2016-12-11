var config = require("./config.json");

exports.HNSlackAuth = (req, res) => {
    var url = require('url');
    var query = url.parse(req.url, true).query;
    var params = {
		code: query.code,
		error: query.error,
		state: query.state
    };
    params["serverlessup_host"] = config.serverlessup_host;
    params["serverlessup_token"] = config.serverlessup_token;
    params["slack_client_id"] = config.slack_client_id;
    params["slack_client_secret"] = config.slack_client_secret;
    params["slack_redirect_uri"] = config.slack_redirect_uri;
    run(params, (err,response) => {
        if (err) {
            res.status(500).send(JSON.stringify(err));
        }
        else {
            res.status(200).send(JSON.stringify(response))
        }
    });
};

{% include "../core/HNSlackAuth.js" %}