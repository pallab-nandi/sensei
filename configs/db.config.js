if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

module.exports = {
  DB_NAME: 'discord_bot',
  DB_URI: process.env.DB_URI
}