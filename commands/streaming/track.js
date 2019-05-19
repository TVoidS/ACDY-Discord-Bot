// This allows the command to use the discord.js-commando command system
// It also sets up the requirements.
const commando = require('discord.js-commando')
const fs = require('fs')

// Save location for the tracking info
const fileLoc = __dirname + '/../../streamerData/trackedUsers.json'

// This sets up and exports the command class
// module.exports is what allows it to be used outside of this file
module.exports = class TrackCommand extends commando.Command {

    // This is the constructor
    // When the command is first added to the list,
    // this defines what the command is called by,
    // and described as in the !help command
    // (the help command is auto generated via commando)
    constructor(client){
        super(client,{
            name: 'track', // how the command is called
            group: 'streaming', // The group (or folder) that the command is in
            memberName: 'track', 
            description: 'An example command to help show off how commands with Commando work', // The description that appears in the !help command.
            args: [
                {
                    key: 'TwitchUsername',
                    prompt: 'Your username on twitch (e.g. LobosJr or Amrenos)',
                    type: 'string'
                }
            ],
            guildOnly: true
        })
    }
    
    // This is what the command actually does
    // It runs when it can, and does exactly what is coded
    async run(message, {TwitchUsername}) {

        // This grabs the file from its location to then be parsed
        var file = fs.readFileSync(fileLoc, 'utf8')
        // This actually parses the file
        var trackedUsers = JSON.parse(file)

        // Loads the data into the correct format
        // if the guild is documented:
        if(trackedUsers[message.channel.guild.id]) {
            // Then there is a channel to output to
            var keys = Object.keys(trackedUsers[message.channel.guild.id])

            trackedUsers[message.channel.guild.id][keys[0]].users.push(TwitchUsername)

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

                            console.log("saved tracking for " + message.author.name)
                            // Notify the user that it started tracking their online status
                            message.channel.send("Now tracking " + TwitchUsername)
                        }
                    })
                }
            })
        } else {
            //  Only an admin can set the channel
            message.channel.send("There hasn't been a channel set to output notifications!  Please have an admin do !streamchannel in the channel that you want notifications to set the channel")
        }
    }
}