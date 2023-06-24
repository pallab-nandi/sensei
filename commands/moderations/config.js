const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const { db } = require('../../db/db.model');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('config')
    .setDescription('Show the configuaration of the bot.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  execute: async (interaction) => {

    const guildID = interaction.guildId; //getting guild id
    const guild = await db.guild.findOne({ guildID }); //getting guild details

    const embed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle("Brief Description of configuration in this server!")
      .setAuthor({ name: 'ADMINISTRATOR CONFIG' })
      .setDescription("Modify any settings using: `/set <setting>` ")
      .setThumbnail("https://cdn-icons-png.flaticon.com/512/2385/2385865.png")
      .setFields(
        { name: "Roles", value: `\`auto_role:\` ${guild.autoRoles}\n\`mod_role:\` ${guild.modRoles}\n\`ban_role:\` ${guild.banRoles}` },
        { name: "Video Channels", value: `\`video_channel:\` ${guild.videoChannel}\n\`grace_period:\` ${guild.videoGracePeriod}` },
        { name: "Alert", value: `\`welcome_channel:\` ${guild.welcomeChannel}\n\`notification_channel:\` ${guild.notificationChannel}\n\`study-material_channel:\` ${guild.studyMaterialChannel}` }
      )
      .setImage("https://glitchii.github.io/embedbuilder/assets/media/banner.png")
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });

  }
}