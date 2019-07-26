const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
  id_str: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    default: ''
  },
  entities: {},
  user: {},
  retweet_count: {
    type: Number, required: true
  }
},
  {
    autoIndex: false,
    writeConcern: {
      w: 'majority',
      j: true,
      wtimeout: 1000
    },
    timestamps: true
  }
);

tweetSchema.set('toObject', { getters: true });
const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;