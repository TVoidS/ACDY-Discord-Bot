const commando = require('discord.js-commando');

class LeaveChannelCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'stop',
            group: 'music',
            memberName: 'stop',
            description: 'Tells the bot to stop playing music for now.  It clears the queue and skips the current song',
            guildOnly: true
        });
    }

    async run(message, args) {
        if(message.guild.voiceConnection) { // only even try to do stuff if you have a voice connection.
            // servers[message.guild.id].dispatcher.end();
            if(servers[message.guild.id]) { // if there is a song queue for the server...
                servers[message.guild.id].queue.length = 0;
                servers[message.guild.id].dispatcher.end(); // end the current song.
                message.channel.send('Music stopped!'); // and tell them ! :D
            }
        }
    }
}

module.exports = LeaveChannelCommand;