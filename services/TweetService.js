const Tweet = require('../models/tweet');
const client = require('../config/twitter_client_set_up');

class TweetService {
  /**
   * save function is responsible for saving new tweets into database
   * @param {Array} tweets - the tweets to be saved
   * @returns {Boolean} - flag to confirm that tweets saved successfully
   */
  static async save(tweets = []) {
    const formattedTweets = TweetService.formatTweets(tweets);
    return Tweet.insertMany(formattedTweets, { ordered: true, rawResult: false });
  }

  /**
   * @param  {Array} tweets - tweets to be formatted
   * @returns {Array} - formatted tweets
   */
  static formatTweets(tweets) {
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
    return new Promise((resolve, reject) => {
      client.get('statuses/user_timeline', params, (err, tweets) => {
        if (err) return reject(err);
        return resolve(tweets);
      });
    });
  }

  static async get() {

  }
}

module.exports = TweetService;
