const mongoose = require('mongoose');
const dbConfig = require('../configs/db.config');

const connect = () => {
  mongoose.connect(dbConfig.DB_URI)
    .then(() => {
      console.log('Database connected successfully'.green);
    })
    .catch((err) => {
      console.log('Error while connecting'.red, err)
    })
}

module.exports = { connect }