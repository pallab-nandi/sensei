const fs = require('node:fs');
const path = require('node:path');
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const { token } = require('./configs/token.config');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds
  ]
});

client.commands = new Collection(); //creating new collections of commands

const folderPath = path.join(__dirname, 'commands'); //creating path to the commands folder
const commandFolders = fs.readdirSync(folderPath); //creating an array of directory in commands folder

for (const folder of commandFolders) {
  const commandsPath = path.join(folderPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

  for (const files of commandFiles) {
    const filePath = path.join(commandsPath, files);
    const command = require(filePath);

    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(`[WARNING] The command at ${filePath} is missing a required 'data' or 'execute' property!`);
    }
  }
}

client.once(Events.ClientReady, bot => {
  console.log(`Bot is Ready! Logged in as ${bot.user.tag}...`);
})

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.log(`No command matching ${interaction.commandName} was found!`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (err) {
    console.log(err);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
    } else {
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  }
})


client.login(token);