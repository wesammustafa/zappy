require('dotenv').config();
require('./database');
const TweetService = require('./services/TweetService');

(async () => {
  try {
    const tweets = await TweetService.fetch();
    const formattedTweets = TweetService.format(tweets);
    const removedCount = await TweetService.deleteMany({});
    const result = await TweetService.insertMany(formattedTweets, { ordered: true, rawResult: false });
    const last = await TweetService.find({}, '-tweetId');
    console.log(last);
  } catch (err) {
    console.log(err);
  }
  // const formatted = TweetService.formattedTweets(tweets);
  // console.log(formatted);
})();
