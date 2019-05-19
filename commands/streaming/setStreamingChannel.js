// This allows the command to use the discord.js-commando command system
// It also sets up the requirements.
const commando = require('discord.js-commando')

// Requires fs for filesystem access to write files.
const fs = require('fs')

// The save file for tracking information
const fileLoc = __dirname + '/../../streamerData/trackedUsers.json'

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
            guildOnly: true, // this controls if the command needs to be ran in a guild or not.  Some commands require this.
            userPermissions: ['ADMINISTRATOR']
        })
    }
    
    // This is what the command actually does
    // It runs when it can, and does exactly what is coded
    async run(message, args) {

        // This grabs the file from its location to then be parsed
        var file = fs.readFileSync(fileLoc, 'utf8')
        // This actually parses the file
        var trackedUsers = JSON.parse(file)

        if(trackedUsers[message.channel.guild.id]) {

            if(Object.keys(trackedUsers[message.channel.guild.id]).length > 0) {
                
                var temp = trackedUsers[message.channel.guild.id][Object.keys(trackedUsers[message.channel.guild.id])[0]]
                delete trackedUsers[message.channel.guild.id][Object.keys(trackedUsers[message.channel.guild.id])[0]]
                trackedUsers[message.channel.guild.id][message.channel.id] = temp
            } else {
                trackedUsers[message.channel.guild.id][message.channel.id] = new Array()
            }
        } else {
            trackedUsers[message.channel.guild.id] = {}
            trackedUsers[message.channel.guild.id][message.channel.id] = new Array()
            
        }

        // Turn the object into a JSON string
        var data = JSON.stringify(trackedUsers, null, '\t')

        // Check if the file exists, and write it
        fs.exists(fileLoc, function(exists) {
            if(exists) {
                fs.writeFile(fileLoc, data, function(err) {
                    if(err) {
                        console.log("Failed to save file!")
                        throw err
                    } else {
                        console.log("saved tracking location")
                        message.channel.send("This channel is now the output for 'Now Live' notifications for this Discord Server!")
                    }
                })
            }
        })
    }
}