const client = require("../config/twitter_client_set_up");
require("dotenv").config();
const params = { user_id: 935805382236176384 };
const fetchTweets = async function () {
  return new Promise(function (resolve, reject) {
    client.get("statuses/user_timeline", params, function (err, tweets, response) {
      if (err) reject(err);
      console.log(tweets);
      resolve(tweets);
    });
  });
}

const result = await fetchTweets();
