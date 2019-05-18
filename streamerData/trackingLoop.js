// Require request so that I can make HTTP requests
const request = require('request')

// This references the token.js file that contains private data that should only be used by my bot
// The CLIENTID for accessing the Twitch Helix API and all other data concerning that is private and secure.
// Therefore it will not be shared.
const CLIENTID = require(__dirname + '/../token.js').CLIENTID

// This is the base link for the Twitch Helix API.
// It is used whenever I need to request the state of a particular user's stream.
var baseLink = 'https://api.twitch.tv/helix/streams'

// Starts the loop of detection
function startLoop(delay) {
    setInterval(function() {
        requestStatus()
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

// The callback function for the HTTP request.
// Separated for readability
// This handles what to do with the returned JSON data.
function callback(error, response, body) {
    if(!error && response.statusCode == 200) {
        var info = JSON.parse(body)

        if(info.data[0]){
            // Represents the data array in the response field
            var info = JSON.parse(body).data[0]

            // The start time of the stream that was pinged.
            var streamDate = new Date(info.started_at).getTime()
            var currDate = new Date().getTime()

            console.log('\nThe Date() version of the same information:')
            console.log("Stream Start Time: " + new Date(info.started_at).getTime())
            console.log("Current Time: " + new Date().getTime())
            console.log("Time Difference: " + (currDate - streamDate))
            
            // Check if stream went live recently
            if(currDate - streamDate < 10000) {
                
            } // if it didn't, don't ping anyone
        }
    }
}

// This grabs the list of usernames to test for live status.
function grabUsernames() {

}

// This function requests the status of the stream based on the login info
function requestStatus(login) {
    request(baseLink + '?user_login=' + login, options, callback)
}

// This is the beginning of all of functions

function begin() {
    trackedUsernames = new Array()
    trackedUsernames.push(grabUsernames())
}