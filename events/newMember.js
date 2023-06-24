const { Events, EmbedBuilder } = require('discord.js');
const { db } = require('../db/db.model');

module.exports = {
  name: Events.GuildMemberAdd,
  execute: async (member) => {

    const memberId = member.user.id;
    const memberAvatar = member.user.avatar;
    const avatarURL = `https://cdn.discordapp.com/avatars/${memberId}/${memberAvatar}.jpeg`;

    const guild = await db.guild.findOne({ guildID: member.guild.id });

    if (guild.welcomeChannel === 'None') return;

    //auto role added on joining the server
    if (guild.autoRoles !== 'None') {
      const autoRoleId = guild.autoRoles.slice(3, guild.autoRoles.length - 1);
      const autoRole = await member.guild.roles.cache.get(autoRoleId);

      await member.roles.add(autoRole);
    }

    const channelID = guild.welcomeChannel.slice(2, guild.welcomeChannel.length - 1);
    const channel = await member.guild.channels.cache.get(channelID);

    const contentMsg = `**Welcome <@${memberId}> to the world of Fullstack Development! Prepare to unlock your creativity and build remarkable web applications. This journey will empower you with essential skills, from front-end design to back-end programming. Join us as we explore the exciting realm of Fullstack Development together!**\n`;

    const msg = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle("Welcome :smiley:")
      .setAuthor({ name: "FULLSTACK DEVELOPMENT COURSE" })
      .setDescription("You are now a new student of Fullstack Development community!")
      .setThumbnail(avatarURL)
      .setFields(
        {
          name: "Student Name:",
          value: `<@${memberId}>`
        },
        {
          name: "Course Name:",
          value: `Full-Stack Development`,
          inline: true
        },
        {
          name: "Course Period:",
          value: "12 Months",
          inline: true
        },
        {
          name: "Course Start Date:",
          value: "10th July 2023",
          inline: false
        },
        {
          name: "Wishes",
          value: `May the stars align in your favor as you embark on this new chapter of your academic journey!`,
          inline: false
        }
      )
      .setImage('https://usercontent.one/wp/www.stockportcu.com/wp-content/uploads/2020/07/celebrate.jpg')
      .setTimestamp()
      .setFooter({ text: "Best of Luck 👍" })

    await channel.send({
      content: contentMsg,
      embeds: [msg]
    });

  }
}