function main(params) {
	console.log("Processing /hn: " + JSON.stringify(params, null, 2));
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

{% include "../core/HNSlackCommandTopStories.js" %}