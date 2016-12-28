function run(params, callback) {
	var payload = JSON.parse(decodeURIComponent(params.payload));
	var action = payload.actions[0].name;
	console.log('Processing action ' + action);
	if (action == 'hn_topstories_more') {
		var response = {
			delete_original: false,
			replace_original: false,
			text: "Loading more stories..."
		};
		callback(null, response, payload);
	}
	else {
		var response = { text: "Sorry, I do not understand the action '" + action + "'." };
		callback(new Error(), response);
	}
}