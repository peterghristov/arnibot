const Discord = require('discord.js');
const Mongo = require('mongodb'); 
const File = require('fs');

const client = new Discord.Client();

const config = require('./config.json');

client.once('ready', () => {
});

client.on('message', message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).trim().split(" ")
    //message.channel.send('Malchi s tva "' + args + '" ami varvi bluskai!!! also the channel ID is ' + message.guild.id);


    if ("help" == args[0])
    {
        message.channel.send("The available commands are 'info' to view all current and max reps and 'rep <excersize name> <rep count>' to add repetitions to an excerisze.");
    }
    else if ("info" == args[0])
    {
        File.readFile(config.databaseFile, 'utf8', function (err, data) {
            if (err) throw err;
            var db = JSON.parse(data);

            var response = "Here's the sit rep, boy!";
            for (const ex of db.excersizes)
            {
                response += "\n" + ex.name + " " + ex.reps.current + "/" + ex.reps.max;
            }
            message.channel.send(response);
        });
    }
    else if("rep" == args[0])
    {
        // @TODO Check if the aruments have the correct types (string and int)
        if (3 != args.length)
        {
            message.channel.send("The add command is called like this 'add <excersize name> <rep count>'");
            return;
        }

        // @TODO Lock the file
        const data = JSON.parse(File.readFileSync(config.databaseFile, 'utf8'))

        for (var i = 0 ; i < data.excersizes.length ; i++)
        {
            if (data.excersizes[i].name == args[1])
            {
                data.excersizes[i].reps.current += parseInt(args[2], 10);

                File.writeFileSync(config.databaseFile, JSON.stringify(data));
                message.channel.send("Fuck yeah bro " + args[1] + " are now at " + data.excersizes[i].reps.current + " out of " + data.excersizes[i].reps.max);

                return;
            }
        }

        message.channel.send("Excersize " + args[1] + " not found!");
    }
});




client.login(process.env.BOT_TOKEN);
