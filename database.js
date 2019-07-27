/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
const mongoose = require('mongoose');
const Promise = require('bluebird');

Promise.promisifyAll(mongoose);
const server = process.env.DATABASE_SERVER; // REPLACE WITH YOUR DB SERVER
const database = process.env.DATABASE_NAME; // REPLACE WITH YOUR DB NAME

class Database {
  constructor() {
    this._connect();
  }

  // eslint-disable-next-line class-methods-use-this
  _connect() {
    mongoose.connect(`mongodb://${server}/${database}`, { useNewUrlParser: true })
      .then(() => {
        console.log('Database connection successful');
      })
      .catch((err) => {
        console.error('Database connection error', err);
      });
  }
}

module.exports = new Database();
