const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');
const { db } = require('../../db/db.model');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('set')
    .setDescription('Set your configuration for the server.')
    .addSubcommand(subcommand =>
      subcommand
        .setName('welcome_channel')
        .setDescription('Set your welcome message default channel')
        .addChannelOption(channel =>
          channel
            .setName('target')
            .setDescription('Enter Channel you want to set as welcome channel')
            .addChannelTypes(ChannelType.GuildText)
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('notification_channel')
        .setDescription('Set your notification message default channel')
        .addChannelOption(channel =>
          channel
            .setName('target')
            .setDescription('Enter Channel you want to set as notification channel')
            .addChannelTypes(ChannelType.GuildText)
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('study_material_channel')
        .setDescription('Set your notes sharing default channel')
        .addChannelOption(channel =>
          channel
            .setName('target')
            .setDescription('Enter Channel you want to set as sharing study material')
            .addChannelTypes(ChannelType.GuildText)
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('video_channel')
        .setDescription('Set your camera only default channel')
        .addChannelOption(channel =>
          channel
            .setName('target')
            .setDescription('Enter Channel you want to set as video channel')
            .addChannelTypes(ChannelType.GuildVoice)
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('grace_period')
        .setDescription('Set your camera only default channel grace period.')
        .addStringOption(option =>
          option
            .setName('duration')
            .setDescription('Enter duration for the grace period.')
            .addChoices( //values are in seconds
              { name: '15s', value: '15' },
              { name: '1m', value: '60' },
              { name: '5m', value: '300' },
              { name: '15m', value: '900' },
              { name: '30m', value: '1800' },
              { name: '1h', value: '3600' },
              { name: '4h', value: '14400' }
            )
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('auto_role')
        .setDescription('Set a role that will automatically set to new member')
        .addRoleOption(role =>
          role
            .setName('target')
            .setDescription('Enter auto setup role.')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('mod_role')
        .setDescription('Set a default moderator role.')
        .addRoleOption(role =>
          role
            .setName('target')
            .setDescription('Enter moderator role.')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('ban_role')
        .setDescription('Set a default ban role')
        .addRoleOption(role =>
          role
            .setName('target')
            .setDescription('Enter ban role.')
            .setRequired(true)
        )
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  execute: async (interaction) => {

    const guildID = interaction.guildId; //getting guild iChannelTyped

    if (interaction.options.getSubcommand() === 'welcome_channel') {

      const channel = interaction.options.getChannel('target');
      await db.guild.findOneAndUpdate({ guildID }, { welcomeChannel: `${channel}` });
      const reply = await interaction.reply({ content: `Welcome channel set to ${channel} successfully!`, fetchReply: true });
      reply.react('✅');

    } else if (interaction.options.getSubcommand() === 'notification_channel') {

      const channel = interaction.options.getChannel('target');
      await db.guild.findOneAndUpdate({ guildID }, { notificationChannel: `${channel}` });
      const reply = await interaction.reply({ content: `Notification channel set to ${channel} successfully!`, fetchReply: true });
      reply.react('✅');

    } else if (interaction.options.getSubcommand() === 'study_material_channel') {

      const channel = interaction.options.getChannel('target');
      await db.guild.findOneAndUpdate({ guildID }, { studyMaterialChannel: `${channel}` });
      const reply = await interaction.reply({ content: `Notes sharing channel set to ${channel} successfully!`, fetchReply: true });
      reply.react('✅');

    } else if (interaction.options.getSubcommand() === 'video_channel') {

      const channel = interaction.options.getChannel('target');
      await db.guild.findOneAndUpdate({ guildID }, { videoChannel: `${channel}` });
      const reply = await interaction.reply({ content: `Video Channel set to ${channel} successfully!`, fetchReply: true });
      reply.react('✅');

    } else if (interaction.options.getSubcommand() === 'grace_period') {

      const duration = interaction.options.getString('duration');
      await db.guild.findOneAndUpdate({ guildID }, { videoGracePeriod: `${duration}` });
      const reply = await interaction.reply({ content: `Video Channel grace period duration set to ${duration} sec successfully!`, fetchReply: true });
      reply.react('✅');

    } else if (interaction.options.getSubcommand() === 'auto_role') {

      const role = interaction.options.getRole('target');
      await db.guild.findOneAndUpdate({ guildID }, { autoRoles: `${role}` });
      const reply = await interaction.reply({ content: `Auto role set to ${role} successfully!`, fetchReply: true });
      reply.react('✅');

    } else if (interaction.options.getSubcommand() === 'mod_role') {

      const mod = interaction.options.getRole('target');
      await db.guild.findOneAndUpdate({ guildID }, { modRoles: `${mod}` });
      const reply = await interaction.reply({ content: `Moderator role set to ${mod} successfully!`, fetchReply: true });
      reply.react('✅');

    } else if (interaction.options.getSubcommand() === 'ban_role') {

      const ban = interaction.options.getRole('target');
      await db.guild.findOneAndUpdate({ guildID }, { banRoles: `${ban}` });
      const reply = await interaction.reply({ content: `Ban role set to ${ban} successfully!`, fetchReply: true });
      reply.react('✅');

    }
  }
}