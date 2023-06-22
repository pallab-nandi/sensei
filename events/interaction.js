const { Events } = require('discord.js');
const colors = require('colors');

module.exports = {
  name: Events.InteractionCreate,
  execute: async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.log(`No command matching ${interaction.commandName} was found!`.yellow);
      return;
    }

    try {
      await command.execute(interaction);
    } catch (err) {
      console.log(err);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: 'There was an error while executing this command!',
          ephemeral: true
        });
      } else {
        await interaction.reply({
          content: 'There was an error while executing this command!',
          ephemeral: true
        });
      }
    }
  }
}