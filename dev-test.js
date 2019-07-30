require('dotenv').config();
require('./database');
const TweetController = require('./controllers/TweetController');

(async () => {
  try {
    const tweets = await TweetController.save();
    console.log(tweets);

  } catch (err) {
    console.log(err);
  }
})();
