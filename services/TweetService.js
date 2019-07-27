const Tweet = require('../models/tweet');
const client = require('../config/twitter_client_set_up');

class TweetService {
  /**
   * insertMany function is responsible for saving new tweets into database
   * @param {Array} tweets - Tweets to be saved
   * @param {Object} options - Options to be passed to insertMany function
   * @returns {Promise} - Promise Object represent the successfully saved tweets
   */
  static async insertMany(tweets = [], options) {
    return Tweet.insertMany(tweets, options);
  }

  /**
   * @param  {Array} tweets - Array of tweets to be formatted
   * @returns {Array} - Array of formatted tweets
   */
  static format(tweets = []) {
    return tweets.map(twt => ({
      tweetId: twt.id_str,
      text: twt.text,
      entities: twt.entities,
      user: {
        id: twt.user.id,
        name: twt.user.name,
        screenName: twt.user.screen_name,
        profileImageUrlHttps: twt.user.profile_image_url_https,
      },
      createdAt: twt.created_at,
      retweetCount: twt.retweet_count,
    }));
  }

  /**
   * fetch function function is responsible for fetching tweets
   * from `FictionFone` account
   * @returns {Promise} - Promise object represents tweets
   */
  static async fetch() {
    const params = { user_id: process.env.FICTIONFONE_ID };
    return new Promise((resolve, reject) => client.get('statuses/user_timeline', params, (err, tweets) => {
      if (err) return reject(err);
      return resolve(tweets);
    }));
  }

  /**
   * @param  {Object} conditions - Conditions to match documents to remove
   * @returns {Number} - Number of documents removed
   */
  static async deleteMany(conditions) {
    const res = await Tweet.deleteMany(conditions);
    return res.deletedCount;
  }

  /**
   * @param  {Object} filter - Filter object to match documents to retrieve
   * @param  {Object|String} projection - Projection Object|String to pick only needed fields
   * @param  {Object} options - Options Object to query and customize result
   * @returns {Array} - Array of tweets documents
   */
  static async find(filter, projection, options) {
    return Tweet.find(filter, projection, options);
  }
}

module.exports = TweetService;
