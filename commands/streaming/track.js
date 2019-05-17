// This allows the command to use the discord.js-commando command system
// It also sets up the requirements.
const commando = require('discord.js-commando')
const fs = require('fs')


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
                    key: 'streamLink',
                    prompt: 'The link to where your stream will be hosted',
                    type: 'string'
                }
            ],
            guildOnly: true
        })
    }
    
    // This is what the command actually does
    // It runs when it can, and does exactly what is coded
    async run(message, {streamLink}) {

        // Save location for the tracking info
        var fileLoc = __dirname + '/../../streamerData/trackedUsers.json'

        // This grabs the file from its location to then be parsed
        var file = fs.readFileSync(fileLoc, 'utf8')
        // This actually parses the file
        var trackedUsers = JSON.parse(file)

        // Loads the data into the correct format

        // if the guild is documented:
        if(trackedUsers[message.channel.guild.id]) {

            // and if the user is documented in that guild:
            if(trackedUsers[message.channel.guild.id][message.author.id]) {
                // Add the stream link to the user's list of them
                trackedUsers[message.channel.guild.id][message.author.id].links.push(streamLink)
            } else {
                // since the user isn't documented, make the links list and populate it
                trackedUsers[message.channel.guild.id][message.author.id] = {}
                trackedUsers[message.channel.guild.id][message.author.id].links = new Array()
                trackedUsers[message.channel.guild.id][message.author.id].links.push(streamLink)
            }
        } else {
            // since the guild isn't documented, create the guild
            trackedUsers[message.channel.guild.id] = {}
            // and create the user with a populated links list
            trackedUsers[message.channel.guild.id][message.author.id] ={}
            trackedUsers[message.channel.guild.id][message.author.id].links = new Array()
            trackedUsers[message.channel.guild.id][message.author.id].links.push(streamLink)
        }

        // Try to get the guild from the client, to confirm that it exists
        try{
            var retrievedGuild = this.client.guilds.get(message.channel.guild.id)
        }
        catch (err) {
            console.log("broke on retrieving guild")
            console.log(err)
            throw err
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

                        console.log("saved tracking for " + message.author.name)
                        // Notify the user that it started tracking their online status
                        message.channel.send("Now tracking " + retrievedGuild.members.get(message.author.id).displayName + " at " + streamLink)
                    }
                })
            }
        })
    }
}