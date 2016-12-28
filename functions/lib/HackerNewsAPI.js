function getHackerNewsTopStories(startIndex, count, callback) {
	var topStoriesUrl = 'https://hacker-news.firebaseio.com/v0/topstories.json';
	require('https').get(topStoriesUrl, (res) => {
		var stories = [];
		var storyIdsJson = '';
		res.on('data', function (chunk) {
			storyIdsJson += chunk;
		});
		res.on('end', function () {
			var storyIds = JSON.parse(storyIdsJson);
			if (storyIds && storyIds.length > 0) {
				var i = startIndex;
                if (i >= Math.min((startIndex+count),storyIds.length)) {
                    callback(null, stories);
                }
                else {
                    getStoryCallback = function (err, story) {
                        if (story) {
                            var pointsStr = ' point';
                            if (story.score != 1) {
                                pointsStr += 's';
                            }
                            stories.push({
                                title: story.title,
                                title_link: story.url,
                                author_name: story.score + pointsStr + ' by ' + story.by + ' | view comments',
                                author_link: 'https://news.ycombinator.com/item?id=' + story.id
                            });
                        }
                        i = i + 1;
                        if (i >= Math.min((startIndex+count), storyIds.length)) {
                            callback(null, stories);
                        }
                        else {
                            getHackerNewsStory(storyIds[i], getStoryCallback);
                        }
                    };
                    getHackerNewsStory(storyIds[i], getStoryCallback);
                }
			}
		});
	}).on('error', (e) => {
		callback(e, null);
	});
}

function getHackerNewsStory(storyId, callback) {
	var storyUrl = 'https://hacker-news.firebaseio.com/v0/item/' + storyId + '.json';
	require('https').get(storyUrl, (res) => {
		var storyJson = '';
		res.on('data', function (chunk) {
			storyJson += chunk;
		});
		res.on('end', function () {
			var story = JSON.parse(storyJson);
			callback(null, story);
		});
	}).on('error', (e) => {
		callback(e, null);
	});
}