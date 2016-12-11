var config = require("./config.json");

exports.HNSlackCommandHN = (req, res) => {
    var formData = extractFormData(req);
	var params = {
        command: formData['command'],
        text: formData['text'],
        response_url: formData['response_url']
    };
    params['serverlessup_host'] = config.serverlessup_host;
    params['serverlessup_token'] = config.serverlessup_token;
	run(event, (err,response) => {
        if (err) {
            res.status(500).send(JSON.stringify(err));
        }
        else {
            res.status(200).send(JSON.stringify(response))
        }
    });
};

{% include "../core/HNSlackCommandHN.js" %}
{% include "../lib/HttpRequestUtils.js" %}