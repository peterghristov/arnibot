const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json');

client.once('ready', () => {
});

client.on('message', message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    message.channel.send("Malchi s tva " + message.content + ' ami varvi bluskai!!!');
});

//console.log(process.env.BOT_TOKEN)

client.login(process.env.BOT_TOKEN);
