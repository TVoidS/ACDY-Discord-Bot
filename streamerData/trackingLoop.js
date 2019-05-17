module.exports = function startLoop(delay) {
    setInterval(function() {
        loop()
    }, delay)
}


var streamerDataLoc = __dirname + '/trackedUsers.json'
var channelDataLoc = __dirname + '/guildChannels.json'

// The loop that actually tries to detect if someone went live
function loop() {
    
}