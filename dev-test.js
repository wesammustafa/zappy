require('dotenv').config();
require('./database');
// const TweetService = require('./services/TweetService');
const TweetController = require('./controllers/TweetController');

(async () => {
  try {
    const tweets = await TweetController.save();
    console.log(tweets);

  } catch (err) {
    console.log(err);
  }
  // const formatted = TweetService.formattedTweets(tweets);
  // console.log(formatted);
})();
