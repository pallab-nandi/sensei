const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { db } = require('../../db/db.model');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('remove')
    .setDescription('Remove your configuration for the server.')
    .addSubcommand(subcommand =>
      subcommand
        .setName('welcome_channel')
        .setDescription('Remove your welcome message default channel')
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('notification_channel')
        .setDescription('Remove your notification message default channel')
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('study_material_channel')
        .setDescription('Remove your notes sharing default channel')
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('video_channel')
        .setDescription('Remove your camera only default channel')
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('grace_period')
        .setDescription('Remove your camera only default channel grace period.')
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('auto_role')
        .setDescription('Remove a role that will automatically set to new member')
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('mod_role')
        .setDescription('Remove a default moderator role.')
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('ban_role')
        .setDescription('Remove a default ban role')
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  execute: async (interaction) => {

    const guildID = interaction.guildId; //getting guild id

    if (interaction.options.getSubcommand() === 'welcome_channel') {

      await db.guild.findOneAndUpdate({ guildID }, { welcomeChannel: `None` });
      await interaction.reply(`:white_check_mark: Welcome channel removed successfully!`);

    } else if (interaction.options.getSubcommand() === 'notification_channel') {

      await db.guild.findOneAndUpdate({ guildID }, { notificationChannel: `None` });
      await interaction.reply(`:white_check_mark: Notification channel removed successfully!`);

    } else if (interaction.options.getSubcommand() === 'study_material_channel') {

      await db.guild.findOneAndUpdate({ guildID }, { studyMaterialChannel: `None` });
      await interaction.reply(`:white_check_mark: Notes sharing channel removed successfully!`);

    } else if (interaction.options.getSubcommand() === 'video_channel') {

      await db.guild.findOneAndUpdate({ guildID }, { videoChannel: `None` });
      await interaction.reply(`:white_check_mark: Video Channel removed successfully!`);

    } else if (interaction.options.getSubcommand() === 'grace_period') {

      await db.guild.findOneAndUpdate({ guildID }, { videoGracePeriod: `300` });
      await interaction.reply(`:white_check_mark: Video Channel grace period duration set to default successfully!`);

    } else if (interaction.options.getSubcommand() === 'auto_role') {

      await db.guild.findOneAndUpdate({ guildID }, { autoRoles: `None` });
      await interaction.reply(`:white_check_mark: Auto role removed successfully!`);

    } else if (interaction.options.getSubcommand() === 'mod_role') {

      await db.guild.findOneAndUpdate({ guildID }, { modRoles: `None` });
      await interaction.reply(`:white_check_mark: Moderator role removed successfully!`);

    } else if (interaction.options.getSubcommand() === 'ban_role') {

      await db.guild.findOneAndUpdate({ guildID }, { banRoles: `None` });
      await interaction.reply(`:white_check_mark: Ban role removed successfully!`);

    }
  }
}