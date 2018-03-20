const Discord = require('discord.js');
const bot = new Discord.Client();
const prefix = "!"

bot.on("ready", function() {
    console.log(`${bot.user.username} is online!`);
});

client.login(process.env.BOT_TOKEN);
