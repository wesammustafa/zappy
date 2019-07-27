const express = require('express');
const TweetController = require('../controllers/TweetController');

const router = express.Router();

/**
 * @param  {String} '/' - Url to match
 * @param  {Object} req - Request object
 * @param  {Object} res - response Object
 * @returns {Array|Error} - Array of tweets else server error
 */
router.get('/', async (req, res) => {
  try {
    const tweets = await TweetController.get();
    res.status(200).json({
      tweets,
    });
  } catch (err) {
    res.status(500).json({
      err,
    });
  }
});

/**
 * @param  {String} '/' - Url to match
 * @param  {Object} req - Request object
 * @param  {Object} res - response Object
 * @returns {Array|Error} - Array of tweets else server error
 */
router.post('/go', async (req, res) => {
  try {
    const tweets = await TweetController.save();
    res.status(200).json({
      tweets,
    });
  } catch (err) {
    res.status(500).json({
      err,
    });
  }
});
module.exports = router;
