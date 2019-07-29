const Promise = require('bluebird');
const TweetService = require('../services/TweetService');

class TweetController {
  /**
   * save function to fetch new tweets and update tweets in database
   * @returns {Promise} - Promise object represent saved tweets
   */
  static async save() {
    const promises = {};
    const params = { user_id: process.env.FICTIONFONE_ID };
    const tweets = await TweetService.fetch(params);
    promises.formattedTweets = TweetService.format(tweets);
    promises.removedCount = TweetService.delete({});
    const { formattedTweets } = await Promise.props(promises);
    return TweetService.save(formattedTweets, { ordered: true, rawResult: false });
  }

  /**
   * get function to get tweets from database
   * @returns {Promise} - Promise object represent retrieved tweets from database
   */
  static async get() {
    return TweetService.get();
  }
}

module.exports = TweetController;
