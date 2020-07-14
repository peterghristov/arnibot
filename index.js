const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json');

client.once('ready', () => {
});

client.on('message', message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    message.channel.send("What do you mean " + message.content + '?');
});

client.login(config.token);
