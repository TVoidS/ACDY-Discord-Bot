// Require request so that I can make HTTP requests
const request = require('request')

// This references the token.js file that contains private data that should only be used by my bot
// The CLIENTID for accessing the Twitch Helix API and all other data concerning that is private and secure.
// Therefore it will not be shared.
const CLIENTID = require(__dirname + '/../token.js').CLIENTID

// Required for file reading and output
const fs = require('fs')

// Required for Embeds
const RichEmbed = require('Discord.js')

// This is the base link for the Twitch Helix API.
// It is used whenever I need to request the state of a particular user's stream.
var baseLink = 'https://api.twitch.tv/helix/streams'

// This is the link to the streamer data
const fileLoc = __dirname + '/trackedUsers.json'

// Stores the client that is fed from initial call
// Required to grab the guilds and channels by ID
var commandoClient

// Starts the loop of detection
function startLoop(delay, client) {
    commandoClient = client
    setInterval(function() {
        begin()
    }, delay)
}

module.exports = {
    startLoop
}

// The location for the trackedUsers data, so that we can ping the user in the right guilds
var streamerDataLoc = __dirname + '/trackedUsers.json'

// The location for the guildChannels data, so that we can place the messages in the correct place.
var channelDataLoc = __dirname + '/guildChannels.json'

// The HTTP header and such options.
// We require a header so that we can actually make a request from the Twitch Helix API
var options = {
    headers: {
        'Client-ID': CLIENTID
    }
}

var guildKey
var key

// The callback function for the HTTP request.
// Separated for readability
// This handles what to do with the returned JSON data.
// function callback(error, response, body) {
//     if(!error && response.statusCode == 200) {
//         var info = JSON.parse(body)

//         if(info.data[0]){
//             // Represents the data array in the response field
//             var info = JSON.parse(body).data[0]
//             console.log('\n')
//             console.log(info)
//             console.log('\n')

//             // The start time of the stream that was pinged.
//             var streamDate = new Date(info.started_at).getTime()
//             var currDate = new Date().getTime()

//             console.log('\nThe Date() version of the same information:')
//             console.log("Stream Start Time: " + new Date(info.started_at).getTime())
//             console.log("Current Time: " + new Date().getTime())
//             console.log("Time Difference: " + (currDate - streamDate))
            
//             // Check if stream went live recently
//             if(currDate - streamDate < 12190620) {
                
//                 var embed = new RichEmbed.RichEmbed()
//                 .addField(info.user_name + ' just went live!', 'twitch.tv/' + info.user_name)

//                 commandoClient.guilds.get(this.key).channels.get(this.guildKey).sendEmbed(embed)
//             } // if it didn't, don't ping anyone
//         }
//     }
// }

// This grabs the list of usernames to test for live status.
function grabUsernames() {
    // This grabs the file from its location to then be parsed
    var file = fs.readFileSync(fileLoc, 'utf8')
    // This actually parses the file
    var trackedUsers = JSON.parse(file)

    var keys = Object.keys(trackedUsers)

    for(i=0; i<keys.length; i++) {
        // This will go through each guild
        // trackedUsers[keys[i]] should be the guildID, which can then be used to send a message to that guild.
        var guildKeys = Object.keys(trackedUsers[keys[i]])

        for(j=0; j<guildKeys.length; j++) {
            
            for(k=0; k<trackedUsers[keys[i]][guildKeys[j]].length; k++) {
                key = keys[i]
                guildKey = guildKeys[j]
                var username = trackedUsers[keys[i]][guildKeys[j]][k]
                request(baseLink + '?user_login=' + username, options, function (error, response, body) {
                    if(!error && response.statusCode == 200) {
                        var info = JSON.parse(body)
                        
                        if(info.data[0]){
                            // Represents the data array in the response field
                            var info = JSON.parse(body).data[0]
                
                            // The start time of the stream that was pinged.
                            var streamDate = new Date(info.started_at).getTime()
                            
                            var currDate = new Date().getTime()

                            var difference = currDate - streamDate

                            console.log('\n' + info.user_name + ' is live!')
                            console.log("Stream Start Time: " + new Date(info.started_at).getTime())
                            console.log("Current Time: " + new Date().getTime())
                            console.log("Time Difference: " + difference)
                            console.log("In Sec: " + (difference/1000))
                            console.log("In Min: " + (difference/60000))
                            
                            // Check if stream went live recently
                            if(difference < 120000) {
                                
                                commandoClient.guilds.get(key).channels.get(guildKey).send(info.user_name + ' just went live!')
                                commandoClient.guilds.get(key).channels.get(guildKey).send('https://www.twitch.tv/' + info.user_name)
                            } // if it didn't, don't ping anyone
                        }
                    }
                })
            }
        }
    }
}

// This function requests the status of the stream based on the login info
function requestStatus(login, key, guildKey) {
    request(baseLink + '?user_login=' + login, options, callback)
}

// This is the beginning of all of functions

function begin() {
    grabUsernames()
}

function grabFirstKey(obj) {
    var fkeys = Object.keys(obj)
    return fkeys[0]
}