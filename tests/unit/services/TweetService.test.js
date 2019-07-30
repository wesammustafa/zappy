/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
const sinon = require('sinon');
const chai = require('chai');
chai.use(require('chai-as-promised'));
const Tweet = require('../../../models/tweet');
const client = require('../../../config/twitter_client_set_up');
const TweetService = require('../../../services/TweetService');

const { expect } = chai;
describe('TweetService', function () {
  describe('fetch', function () {
    let clientGetStub;
    beforeEach(function () {
      clientGetStub = sinon.stub(client, 'get');
    });
    afterEach(function () {
      clientGetStub.restore();
    });
    it('should be called with correct `FICTIONFONE_ID`', function () {
      const params = { user_id: 1 };
      TweetService.fetch(params);
      expect(clientGetStub.firstCall.args[1]).to.equal(params);
    });

    it('should return `promise object` contains array of tweets', function () {
      clientGetStub.returns(Promise.resolve([{ tweetId: 1 }]));
      const params = { user_id: 1 };
      TweetService.fetch(params);
      const { returnValue } = clientGetStub.firstCall;
      return expect(returnValue).to.eventually.deep.equal([{ tweetId: 1 }]);
    });
  });

  it('should take an `array of tweets` from user timeline and return `formatted array of tweets` ', function () {
    const tweets = [
      {
        text: 'hello! this is the first tweet from fictionfone.',
        retweetCount: 0,
        _id: '5d3fe0dfe2f39a34d360dda8',
        id_str: '937260813135634432',
        created_at: 'Sun Dec 03 10:02:45 +0000 2017',
        entities: {
          hashtags: [],
          symbols: [],
          user_mentions: [],
          urls: [],
        },
        user: {
          id: 935805382236176400,
          name: 'FictionFone',
          screenName: 'FictionFone',
          profileImageUrlHttps: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png',
          profile_image_url_https: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png',
          screen_name: 'FictionFone',
        },
        createdAt: '2017-12-03T10:02:45.000Z',
        __v: 0,
        updatedAt: '2019-07-30T06:17:03.323Z',
        retweet_count: 0,
      }];
    
    const result = TweetService.format(tweets);
    expect(result[0].tweetId).to.equal(tweets[0].id_str);
  });

  describe('save', function () {
    let saveStub;
    afterEach(function () {
      saveStub.restore();
    });

    it('should call `save` once', function () {
      saveStub = sinon.stub(Tweet, 'insertMany');
      TweetService.save();

      // assert that the stub save is called at least once
      expect(saveStub.calledOnce).to.be.true;
    });

    it('should pass array with correct values to `save`', function () {
      const tweets = [{ tweetId: 'tweet-1' }, { tweetId: 'tweet-2' }];
      saveStub = sinon.stub(Tweet, 'insertMany');
      TweetService.save(tweets);

      // assert that save is called with the correct values
      expect(saveStub.firstCall.args[0]).to.equal(tweets);
    });

    it('should return `promise object` contains saved tweets', async function () {
      const expectValues = [{ tweetId: '12345' }];
      const tweets = [{ tweetId: '12345' }];
      saveStub = sinon.stub(Tweet, 'insertMany').returns(Promise.resolve(expectValues));
      TweetService.save(tweets);
      const { returnValue } = saveStub.firstCall;

      // assert that save returns the expected result
      return expect(returnValue).to.eventually.equal(expectValues);
    });
  });
});
