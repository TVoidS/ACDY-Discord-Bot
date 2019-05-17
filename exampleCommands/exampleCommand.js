// This allows the command to use the discord.js-commando command system
// It also sets up the requirements.
const commando = require('discord.js-commando')

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
            name: 'example', // how the command is called
            group: 'game', // The group (or folder) that the command is in
            memberName: 'example', 
            description: 'An example command to help show off how commands with Commando work', // The description that appears in the !help command.
            args: [{ // args is the list of arguments the command requires
                key: 'examplekey', // the required argument
                prompt: 'This key needs to be entered', // the prompt that appears when the command is entered incorrectly (missing a key)
                type: 'string' // the type that the arg is.  It will most often be a string.
            }],
            guildOnly: false // this controls if the command needs to be ran in a guild or not.  Some commands require this.
            // There are more that I will add as I learn/use them
        })
    }
    
    // This is what the command actually does
    // It runs when it can, and does exactly what is coded
    async run(message, examplekey) {

        // CODE GOES HERE

        // example message output
        message.channel.send("Text that it puts out")
    }
}