// This allows the command to use the discord.js-commando command system
// It also sets up the requirements.
const commando = require('discord.js-commando')
const loopLoc = require(__dirname + '/../../streamerData/trackingLoop.js')

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
            name: 'starttrack', // how the command is called
            group: 'moderation', // The group (or folder) that the command is in
            memberName: 'starttrack', 
            description: 'Starts the tracking function for all members.  Useful after a reset.', // The description that appears in the !help command.
            guildOnly: false // this controls if the command needs to be ran in a guild or not.  Some commands require this.
        })
    }
    
    // This is what the command actually does
    // It runs when it can, and does exactly what is coded
    async run(message, args) {
        if(message.author.tag === 'TVoidS#9903'){
            loopLoc.startLoop(60000, this.client)
            console.log("Tracking Loop Started -  This is for conformation that it has started in the console, primarily so the command isn't run again.")
            message.channel.send("Loop started")
        } else {
            message.channel.send("You don't have the permissions for that!  Only my owner is allowed to use that command!")
        }
    }
}