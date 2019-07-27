require('dotenv').config();
require('./database');
const TweetService = require('./services/TweetService');

(async () => {
  try {
    const tweets = await TweetService.fetch();
    const result = await TweetService.save(tweets);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
  // const formatted = TweetService.formattedTweets(tweets);
  // console.log(formatted);
})();
