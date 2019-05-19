/**
 * This file is a test/template file.
 * It was made primarily for checking the functionality of joining voice chats
 * 
 * Most likely, it will have it's functionality removed before the final version of the bot.
 */

const commando = require('discord.js-commando');

class LeaveChannelCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'leave',
            group: 'music',
            memberName: 'leave',
            description: 'Tells the bot to leave the voice channel that it is currently in'
        });
    }

    async run(message, args) {
        if(message.guild.voiceConnection) {
            message.guild.voiceConnection.disconnect();
        } else {
            message.channel.send('I\'m not in a voice channel to leave on this server!');
        }
    }
}

module.exports = LeaveChannelCommand;