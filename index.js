const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const scrape = require('./scrape.js')
var CronJob = require('cron').CronJob;



const job = new CronJob('* 10 * * * *', function() {
    scrape.getGamesOnCron
});


client.once('ready', () => {
    console.log('Ready!');
    job.start()
});

client.on('message', message => {
    if (message.content === '!games') {
        // send back "Pong." to the channel the message was sent in
        scrape.getGamesOnCommand(message)
    }
});


client.login(config.token);
