const mongoose = require('mongoose');
const { Schema } = mongoose;

const tweetSchema = new Schema({
  tweetId: {
    type: String,
    trim: true,
    required: true,
    index: true
  },
  text: {
    type: String,
    lowercase: true,
    trim: true,
    default: ''
  },
  entities: Schema.Types.Mixed,
  user: Schema.Types.Mixed,
  retweetCount: {
    type: Number,
    required: true
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