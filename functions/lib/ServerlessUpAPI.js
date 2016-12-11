/**
 * @callback getCachedValueCallback
 * @param {Object} err - error message if error encountered
 * @param {number} statusCode - http status code returned from serverlessup
 * @param {Object} value - the cached value retrieved
 */

/**
 * Attempts to retrieve a cached value from the serverlessup host.
 * @param {string} host - serverlessup host
 * @param {string} token - serverlessup token
 * @param {string} name - name of the value to retrieve (name/value pair)
 * @param {getCachedValueCallback} callback - callback to handle the response
 */
function getCachedValue(host, token, name, callback) {
	var options = {
		hostname: host,
		port: 443,
		path: '/api/kv/' + encodeURIComponent(name) + '?t=' + encodeURIComponent(token),
		rejectUnauthorized: false
	};
	var req = require('https').get(options, (res) => {
		var json = null;
		res.on('data', function (chunk) {
			if (json == null) {
                json = '';
			}
            json += chunk;
		});
		res.on('end', function () {
			try {
				callback(null, res.statusCode, JSON.parse(json));
			}
			catch(e) {
				callback(e);
			}
		})
	});
	req.on('error', (e) => {
		console.log("Error getting cached value: " + e);
		callback(e);
	});
	req.end();
}

/**
 * @callback cacheValueCallback
 * @param {Object} err - error message if error encountered
 * @param {number} statusCode - http status code returned from serverlessup
 */

/**
 * Attempts to cache a value with serverlessup host.
 * @param {string} host - serverlessup host
 * @param {string} token - serverlessup token
 * @param {string} name - name of the value to cache (name/value pair)
 * @param {Object} value - the value to cache
 * @param expire - expiration in minutes
 * @param {cacheValueCallback} callback - callback
 */
function cacheValue(host, token, name, value, expire, callback) {
	var postData = JSON.stringify(value);
	var options = {
		hostname: host,
		port: 443,
		path: '/api/kv/' + encodeURIComponent(name) + '?t=' + encodeURIComponent(token) + '&e=' + expire,
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Content-Length': Buffer.byteLength(postData)
		},
		rejectUnauthorized: false
	};
	var req = require('https').request(options, (res) => {
		res.on('data', function(chunk) {
  		});
		res.on('end', () => {
			callback(null, res.statusCode);
		});
	});
	req.on('error', (e) => {
		console.log("Error caching value: " + e);
		callback(e);
	});
	req.write(postData);
	req.end();
}

/**
 * @callback getJsonDocCallback
 * @param {Object} err - error message if error encountered
 * @param {number} statusCode - http status code returned from serverlessup
 * @param {Object} jsonDoc - json document retrieved
 */

/**
 * Attempts to retrieve a json document from the serverlessup host.
 * @param {string} host - serverlessup host
 * @param {string} token - serverlessup token
 * @param {string} id - id of the document to retrieve
 * @param {getJsonDocCallback} callback - callback
 */
function getJsonDoc(host, token, id, callback) {
    var options = {
        hostname: host,
        port: 443,
        path: '/api/json/' + encodeURIComponent(id) + '?t=' + encodeURIComponent(token),
        rejectUnauthorized: false
    };
    var req = require('https').get(options, (res) => {
        var json = null;
        res.on('data', function (chunk) {
            if (json == null) {
                json = '';
            }
            json += chunk;
        });
        res.on('end', function () {
            try {
                callback(null, res.statusCode, JSON.parse(json));
            }
            catch(e) {
                callback(e);
            }
        })
    });
    req.on('error', (e) => {
        callback(e);
    });
}

/**
 * @callback saveJsonDocCallback
 * @param {Object} err - error message if error encountered
 * @param {number} statusCode - http status code returned from serverlessup
 */

/**
 * Attempts to save a json document with the serverlessup host.
 * @param {string} host - serverlessup host
 * @param {string} token - serverlessup token
 * @param {Object} value - the value to save
 * @param {saveJsonDocCallback} callback - callback
 */
function saveJsonDoc(host, token, value, callback) {
    var postData = JSON.stringify(value);
    var options = {
        hostname: host,
        port: 80,
        path: '/api/jd?t=' + encodeURIComponent(token),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        },
        rejectUnauthorized: false
    };
    var req = require('https').request(options, (res) => {
        res.on('data', function(chunk) {
        });
        res.on('end', () => {
            callback(null, res.statusCode);
        });
    });
    req.on('error', (e) => {
        callback(e);
    });
    // write data to request body
    req.write(postData);
    req.end();
}