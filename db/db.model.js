const mongoose = require("mongoose");
const db = {};

const guildSchema = new mongoose.Schema({

  guildID: {
    type: String
  },
  guildName: {
    type: String
  },
  autoRoles: {
    type: String
  },
  modRoles: {
    type: String
  },
  banRoles: {
    type: String
  },
  videoChannel: {
    type: String
  },
  videoGracePeriod: {
    type: String
  },
  welcomeChannel: {
    type: String
  },
  notificationChannel: {
    type: String
  },
  studyMaterialChannel: {
    type: String
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => {
      return Date.now();
    }
  },
  updatedAt: {
    type: Date,
    default: () => {
      return Date.now();
    }
  }

})


const guildModel = mongoose.model("guilds", guildSchema);
db.guild = guildModel;

module.exports = { db }