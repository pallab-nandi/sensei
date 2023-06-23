const { Events, EmbedBuilder } = require("discord.js");
const { db } = require("../db/db.model");

module.exports = {
  name: Events.VoiceStateUpdate,
  execute: async (oldState, newState) => {

    const member = newState.member;

    const guildID = member.guild.id;
    const guild = await db.guild.findOne({ guildID });
    const vcID = guild.videoChannel.slice(2, guild.videoChannel.length - 1);
    const modRole = guild.modRoles.slice(3, guild.modRoles.length - 1);
    const gracePeriod = parseInt(guild.videoGracePeriod);

    if (newState.channel && newState.channel.id === vcID) {

      const alertMsg = new EmbedBuilder()
        .setAuthor({ name: "Please enable your camera!" })
        .setTitle(`You are in live session in channel: <#${vcID}>! and you haven't enabled your camera!`)
        .setDescription('Please enable your video or leave the session in the next **60 seconds**, otherwise you will be **disconnected** from the session.')
        .setTimestamp()
        .setFooter({ text: 'Code Classroom' })
        .setColor(0xFFA500);

      const discMsg = new EmbedBuilder()
        .setAuthor({ name: "Your camera were disabled for too long!" })
        .setTitle(`You are disconnected from live session channel: <#${vcID}> due to disabling your camera!`)
        .setTimestamp()
        .setFooter({ text: 'Code Classroom' })
        .setColor(0xFF0000)

      const thanksMsg = new EmbedBuilder()
        .setAuthor({ name: 'Thanks for enabling your camera!' })
        .setTimestamp()
        .setColor(0x00FF00)
        .setFooter({ text: 'Code Classroom' })

      if (newState.selfVideo || member.roles.cache.has(modRole)) return;

      setTimeout(() => {

        if (!newState.selfVideo) {
          member.user.send({ embeds: [alertMsg] });

          setTimeout(() => {
            if (!newState.selfVideo) {
              newState.disconnect();
              member.user.send({ embeds: [discMsg] });
              return;
            } else if (newState.selfVideo) {
              member.user.send({ embeds: [thanksMsg] });
              return;
            }
          }, 30 * 1000);
        }
      }, 30 * 1000);
    }
  }
}