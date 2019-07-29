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
  });

  it('should `format` tweets from user time line ', function () {

  });
  it('should `delete` old tweets from db', function () {

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
