// sets up the discord.js-commando dependency to be used on the Commando variable name
const Commando = require('discord.js-commando')

// Starts the local client
const Bot = new Commando.Client()

// Grabs the token from token.js
const TOKEN = require('./token.js')


// Commands registry
Bot.registry.registerGroup('general', 'General Commands')
Bot.registry.registerGroup('streaming', 'Streaming Commands')
Bot.registry.registerGroup('music', 'Music Commands')
Bot.registry.registerGroup('game', 'Game Helper Commands')
Bot.registry.registerGroup('moderation', 'Moderator Commands')

Bot.registry.registerDefaults()
Bot.registry.registerCommandsIn(path.join(__dirname, 'commands'))

// Global Lists
// These are lists that *should* affect everything,
// or are needed to manage multiple servers.

// stores a list of all servers for things that 
// don't need to be ssaved between instances (song queues for now)
global.servers = {};


// Detects when the bot is ready and logs it.
Bot.once("ready", () => {
    console.log("Discord.js-commando Bot Started")
    console.log("Connection should be ready")
    Bot.user.setActivity("!help for help!")
})

// Handles errors with the bot:
Bot.on('error', console.error)

// Welcome to the server test message to verify functionality
Bot.on("guildMemberAdd", (member) => {
    member.guild.channels.find(channel => channel.name === "welcome").send("Welcome to Ascendency, " + member.user)
})

// Tells the bot to connect using teh token stored in token.js
// token.js WILL NOT BE INCLUDED in any distribution of this code,
// as it would allow them to take over my bot with their own code.

// Instead, there is an example of the token.js file that you will
// need to fix to get the bot to work.
Bot.login(TOKEN.TOKEN)