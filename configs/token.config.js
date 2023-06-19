if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

module.exports = {
  token: process.env.TOKEN,
  client_id: process.env.Client_ID
}