const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./configs/token.config');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds
  ]
});


client.once(Events.ClientReady, bot => {
  console.log(`Bot is Ready! Logged in as ${bot.user.tag}...`);
})


client.login(token);