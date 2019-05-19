// NOTE: mhwbuilder.js in the /commands/general/ folder is the template that describes the general information about these small command files.

const commando = require('discord.js-commando');
const YTDL = require('ytdl-core');

// This function handles the song playing, and moving along the queue.
function Play(connection, message) {
    servers[message.guild.id].dispatcher = connection.playStream(YTDL(servers[message.guild.id].queue[0], { filter: "audioonly", quality: "highestaudio"}));
    servers[message.guild.id].queue.shift();
    servers[message.guild.id].dispatcher.on("end", function() {
        if(servers[message.guild.id].queue[0]) {
            Play(connection, message);
        } else {
            connection.disconnect();
        }
    });
}

class QueueSongCommand extends commando.Command {

    constructor(client){
        super(client,{
            name: 'queue', 
            group: 'music', 
            memberName: 'queue', 
            description: 'queue <inputURL> OR queue <searchThing> - Play adds a song to the queue of songs' ,
            guildOnly: true,
            args: [
                {
                    key: 'inputURL',
                    prompt: 'You need to put in the direct link to the song',
                    type: 'string'
                }
            ]
        });
    }

    async run(message, { inputURL }) {
        
        if(message.member.voiceChannel) {
            
            if(!message.guild.voiceConnection) {
                
                if(!servers[message.guild.id]) {
                    servers[message.guild.id] = {
                        queue: []
                    };
                }
                message.member.voiceChannel.join()
                .then(connection => {
                    message.channel.send('Joined!');
                    servers[message.guild.id].queue.push(inputURL);
                    message.channel.send('Song added to queue!');  
                    Play(connection, message);
                });
            } else {
                if(!servers[message.guild.id]) {
                    servers[message.guild.id] = {
                        queue: []
                    };
                    message.member.voiceChannel.join()
                    .then(connection => {
                        message.channel.send('Joined!');
                        servers[message.guild.id].queue.push(inputURL);
                        message.channel.send('Song added to queue!');
                        Play(connection, message);
                    });
                } else {
                    if(servers[message.guild.id].queue.length < 1) {
                        message.member.voiceChannel.join()
                        .then(connection => {
                            servers[message.guild.id].queue.push(inputURL);
                            message.channel.send('Song added to queue!');  
                            Play(connection, message);
                        });
                    } else {
                        servers[message.guild.id].queue.push(inputURL);
                        message.channel.send('Song added to queue!');
                    }
                }
            }
        } else {
            message.channel.send('You need to be in a voice chat for me to accept you!');
        }
    }
}

module.exports = QueueSongCommand;