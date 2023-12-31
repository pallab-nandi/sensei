const { Events } = require('discord.js');
const colors = require('colors');

const { db } = require('../db/db.model');

module.exports = {
  name: Events.GuildCreate,
  execute: async (guild) => {
    console.log(`Joined a new Guild: ${guild.name}`.bgGreen);

    await db.guild.create({
      guildID: guild.id,
      guildName: guild.name,
      autoRoles: 'None',
      modRoles: 'None',
      banRoles: 'None',
      videoChannel: 'None',
      videoGracePeriod: '300',
      welcomeChannel: 'None',
      notificationChannel: 'None',
      studyMaterialChannel: 'None'
    })
  }
}