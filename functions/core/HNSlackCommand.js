function run(params, callback) {
	var command = decodeURIComponent(params.command);
	console.log('Processing command ' + command);
	if (command == '/hn') {
		var valid = false;
		var action = params.text;
		if (! action || action.length == 0) {
			action = 'top';
		}
		if (action == 'top') {
			valid = true;
		}
		// TODO:support other actions here
		if (! valid) {
			var response = { text: 'Sorry, I do not understand your command.' };
			callback(new Error(), response);
		}
		else {
			var response = { text: 'Top stories coming up...' };
			callback(null, response, action);
		}
	}
	else {
		var response = { "text": "Sorry, I do not understand the command '" + command + "'." };
		callback(new Error(), response);
	}
}