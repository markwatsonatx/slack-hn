function main(params) {
	return new Promise((resolve, reject) => {
		run(params, (error, response) => {
			if (error) {
				reject(error);
			}
			else {
				resolve(response);
			}
		});
    });
}

{% include "../core/HNSlackAuth.js" %}