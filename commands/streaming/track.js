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

        // This grabs the file from its location to then be parsed
        var file = fs.readFile(__dirname + '../../../streamerData/trackedUsers.json', 'utf8', function(err, data) {
            if(err) {
                console.log(err)
                throw err
            }
            console.log(data)
            console.log("ending file read")
        })
        // This actually parses the file
        var trackedUsers = JSON.parse(file)

        console.log(trackedUsers)

        // Loads the data into the correct format

        // if the guild is documented:
        if(trackedUsers.guilds[message.channel.guild.id]) {

            // and if the user is documented in that guild:
            if(trackedUsers.guilds[message.channel.guild.id][message.author.id]) {
                // Add the stream link to the user's list of them
                trackedUsers.guilds[message.channel.guild.id][message.author.id].links.push(streamLink)
            } else {
                // since the user isn't documented, make the links list and populate it
                trackedUsers.guilds[message.channel.guild.id][message.author.id] ={links:[streamLink]}
            }
        } else {
            // since the guild isn't documented, create the guild
            trackedUsers.guilds[message.channel.guild.id] = {}
            // and create the user with a populated links list
            trackedUsers.guilds[message.channel.guild.id][message.author.id] ={links:[streamLink]}
        }

        console.log()
        console.log(trackedUsers)

        try{
            var retrievedGuild = this.client.guilds.get(message.channel.guild.id)
        }
        catch (err) {
            console.log("broke on retrieving guild")
            console.log(err)
            throw err
        }

        fs.writeFile(__dirname + '../../../streamerData/trackedUsers.json', JSON.stringify(trackedUsers, null, '\t'), (err) => {
            if(err) {
                console.log(err)
                throw err
            }
            console.log("file saved! (or at least attempted to be)")
        })
        console.log(fs.readFileSync(__dirname + '../../../streamerData/trackedUsers.json'))

        // Notify the user that it started tracking their online status
        message.channel.send("Now tracking " + retrievedGuild.members.get(message.author.id).displayName + " at " + streamLink)
    }
}

// This function may need to be exported to another file so that it can be handled separately from the commands.
function trackingUpdate() {

}