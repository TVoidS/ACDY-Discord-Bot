// NOTE: mhwbuilder.js in the /commands/general/ folder is the template that describes the general information about these small command files.

const commando = require('discord.js-commando');

class ClearQueueCommand extends commando.Command {

    constructor(client) {
        super(client, {
            name: 'clear',
            group: 'music',
            memberName: 'clear',
            description: 'This command clears the song queue!',
            guildOnly: true
        });
    };

    async run(message) {
        if(servers[message.guild.id]){
            if(servers[message.guild.id].queue) {
                servers[message.guild.id].queue.length = 0;
                message.channel.send('Queue Cleared!');
            } else {
                message.channel.send('No Queue to Clear!');
            }
        } else {
            servers[message.guild.id] = {
                queue: []
            };
            message.channel.send('No Queue to Clear!');
        }
    };
}

module.exports = ClearQueueCommand;