const commando = require('discord.js-commando');

class LeaveChannelCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'skip',
            group: 'music',
            memberName: 'skip',
            description: 'Tells the bot to skip the currently running song',
            guildOnly: true
        });
    }

    async run(message, args) {
        if(message.guild.voiceConnection) { // only even try to do stuff if you have a voice connection.
            // servers[message.guild.id].dispatcher.end();
            if(servers[message.guild.id].queue.length > -1) { // if there is a song queue for the server...
                // servers[message.guild.id].dispatcher.end(); // end the current song.
                message.guild.voiceConnection.dispatcher.end(); // same as above, but more guaranteed?
                message.channel.send('Song skipped!'); // and tell them ! :D
            }
        }
    }
}

module.exports = LeaveChannelCommand;