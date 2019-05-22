/**
 * This file is a test/template file.
 * It was made primarily for checking the functionality of joining voice chats
 * 
 * Most likely, it will have it's functionality removed before the final version of the bot.
 */

 /*
const commando = require('discord.js-commando');

class JoinChannelCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'join',
            group: 'music',
            memberName: 'join',
            description: 'join - Tells the bot to join the voice channel that you are in'
        });
    }

    async run(message, args) {
        if(message.member.voiceChannel) {
            if(!message.guild.voiceConnection) {
                message.member.voiceChannel.join()
                    .then(connection => {
                        message.channel.send('Joined!');
                    });
            } else {
                message.channel.send('I\'m already connected in a vc on this server!');
            }
        } else {
            message.channel.send('You need to be in a voice chat for me to join you!');
        }
    }
}

module.exports = JoinChannelCommand;
*/