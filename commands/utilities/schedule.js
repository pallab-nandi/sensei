const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { db } = require('../../db/db.model');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('add')
    .setDescription('Add a schedule message to send in a channel.')
    .addSubcommand(subcommand =>
      subcommand
        .setName('notes')
        .setDescription('Schedule study materials.')
        .addStringOption(option =>
          option
            .setName('title')
            .setDescription('Enter the title of the.')
            .setRequired(true)
        )
        .addIntegerOption(option =>
          option
            .setName('yr')
            .setDescription('Enter Year')
            .setRequired(true)
        )
        .addIntegerOption(option =>
          option
            .setName('m')
            .setDescription('Enter Month')
            .setRequired(true)
        )
        .addIntegerOption(option =>
          option
            .setName('dt')
            .setDescription('Enter Date')
            .setRequired(true)
        )
        .addIntegerOption(option =>
          option
            .setName('hr')
            .setDescription('Enter Hour (in 24hr format)')
            .setRequired(true)
        )
        .addIntegerOption(option =>
          option
            .setName('min')
            .setDescription('Enter Minute')
            .setRequired(true)
        )
        .addAttachmentOption(option =>
          option
            .setName('attachment')
            .setDescription('Attach the study material.')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('session')
        .setDescription('Schedule new session for live class.')
        .addStringOption(option =>
          option
            .setName('title')
            .setDescription('Write a title for the session')
            .setRequired(true)
        )
        .addStringOption(option =>
          option
            .setName('description')
            .setDescription('Enter the description for the session.')
            .setRequired(true)
        )
        .addIntegerOption(option =>
          option
            .setName('yr')
            .setDescription('Enter Year')
            .setRequired(true)
        )
        .addIntegerOption(option =>
          option
            .setName('m')
            .setDescription('Enter Month')
            .setRequired(true)
        )
        .addIntegerOption(option =>
          option
            .setName('dt')
            .setDescription('Enter Date')
            .setRequired(true)
        )
        .addIntegerOption(option =>
          option
            .setName('hr')
            .setDescription('Enter Hour (in 24hr Format)')
            .setRequired(true)
        )
        .addIntegerOption(option =>
          option
            .setName('min')
            .setDescription('Enter Minute')
            .setRequired(true)
        )
        .addAttachmentOption(option =>
          option
            .setName('image')
            .setDescription('Upload the thumbnail image for the notification.')
            .setRequired(true)
        )
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  execute: async (interaction) => {

    const guildID = interaction.guildId;
    const guild = await db.guild.findOne({ guildID });

    if (interaction.options.getSubcommand() === 'notes') {

      const channelID = guild.studyMaterialChannel.slice(2, guild.studyMaterialChannel.length - 1);
      const channel = await interaction.guild.channels.cache.get(channelID);

      if (guild.studyMaterialChannel === 'None') {
        const reply = await interaction.reply({ content: 'The note sharing channel is not set yet. Please set that first!', fetchReply: true })
        reply.react('🥺');
        return;
      }

      const title = interaction.options.getString('title');
      const yr = interaction.options.getInteger('yr');
      const m = interaction.options.getInteger('m');
      const dt = interaction.options.getInteger('dt');
      const hr = interaction.options.getInteger('hr');
      const min = interaction.options.getInteger('min');
      const attachment = interaction.options.getAttachment('attachment');

      const time = new Date(yr, m - 1, dt, hr, min);
      const now = new Date(Date.now());
      const schedule = time.getTime() - now.getTime();

      const file = new AttachmentBuilder(attachment.url);

      const msg = new EmbedBuilder()
        .setTitle(title)
        .setAuthor({ name: 'Study Material' })
        .setColor('Green')
        .setDescription(`We hope you are hardworking to grow your career to brightest path! Therefore here are some study materials to enhance your learning more!`)
        .setFields(
          {
            name: 'Click to download:',
            value: `[${attachment.name}](${attachment.url})`
          }
        )
        .setThumbnail('https://img.freepik.com/free-vector/learning-concept-illustration_114360-6186.jpg')
        .setImage('https://tejasviclasses.in/wp-content/uploads/2022/03/trophy.gif')

      const reply = await interaction.reply({ content: `Message is scheduled for ${time}.`, fetchReply: true });
      reply.react('✅');

      setTimeout(async () => {
        await channel.send({
          content: `**Hi ${guild.autoRoles}, Hope you enjoyed the session well! Here are your study materials from the session.\nIf you have any doubts or issues drop your query in the ${'#test'} channel :smiley:**`,
          embeds: [msg],
          files: [file]
        })
      }, schedule)

    }

    if (interaction.options.getSubcommand() === 'session') {
      const channelID = guild.notificationChannel.slice(2, guild.notificationChannel.length - 1);
      const channel = await interaction.guild.channels.cache.get(channelID);

      if (guild.notificationChannel === 'None') {
        const reply = await interaction.reply({ content: 'The notification channel is not set yet. Please set that first!', fetchReply: true })
        reply.react('🥺');
        return;
      }

      const title = interaction.options.getString('title');
      const description = interaction.options.getString('description');
      const yr = interaction.options.getInteger('yr');
      const m = interaction.options.getInteger('m');
      const dt = interaction.options.getInteger('dt');
      const hr = interaction.options.getInteger('hr');
      const min = interaction.options.getInteger('min');
      const attachment = interaction.options.getAttachment('image');

      const time = new Date(yr, m - 1, dt, hr, min);
      const now = new Date(Date.now());
      const schedule = time.getTime() - now.getTime();

      const msg = new EmbedBuilder()
        .setTitle(title)
        .setAuthor({ name: 'Live Session' })
        .setColor('Green')
        .setDescription(description)
        .setFields(
          {
            name: 'Topic',
            value: `${title}`
          }
        )
        .setThumbnail('https://cdni.iconscout.com/illustration/premium/thumb/clock-ticking-to-new-year-eve-6923431-5669296.png')
        .setImage(attachment.url)

      const reply = await interaction.reply({ content: `Message is scheduled for ${time}.`, fetchReply: true });
      reply.react('✅');

      setTimeout(async () => {
        await channel.send({
          content: `**Hi ${'@everyone'}**`,
          embeds: [msg]
        })
      }, schedule)
    }
  }
}