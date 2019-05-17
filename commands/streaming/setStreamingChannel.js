// This allows the command to use the discord.js-commando command system
// It also sets up the requirements.
const commando = require('discord.js-commando')

// Requires fs for filesystem access to write files.
const fs = require('fs')

// This sets up and exports the command class
// module.exports is what allows it to be used outside of this file
module.exports = class ExampleCommand extends commando.Command {

    // This is the constructor
    // When the command is first added to the list,
    // this defines what the command is called by,
    // and described as in the !help command
    // (the help command is auto generated via commando)
    constructor(client){
        super(client,{
            name: 'streamchannel', // how the command is called
            group: 'streaming', // The group (or folder) that the command is in
            memberName: 'streamchannel', 
            description: 'Designates the channel as the guild/server\'s stream advertisement channel', // The description that appears in the !help command.
            guildOnly: true // this controls if the command needs to be ran in a guild or not.  Some commands require this.
        })
    }
    
    // This is what the command actually does
    // It runs when it can, and does exactly what is coded
    async run(message, args) {
        var channelSave = {
            guild: message.channel.guild,
            channel: message.channel
        }

        JSON.stringify(channelSave)

    }
}