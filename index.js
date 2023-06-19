const fs = require('node:fs');
const path = require('node:path');
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const { token } = require('./configs/token.config');
const { execute } = require('./events/interaction');

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


const eventPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventPath, file);
  const event = require(filePath);

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}


client.login(token);