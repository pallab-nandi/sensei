const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('Give a success output!'),

  execute: async (interaction) => {
    await interaction.reply(`This is a success! And I know you are ${interaction.user.username}, who joined at ${interaction.member.joinedAt} in ${interaction.guild.name}`)
  }
}