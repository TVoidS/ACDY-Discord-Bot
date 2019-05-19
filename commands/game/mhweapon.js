// This allows the command to use the discord.js-commando command system
// It also sets up the requirements.
const commando = require('discord.js-commando')
const RichEmbed = require('discord.js')

// Object with all weapons and types available
var allOptions = {
    mhw: {
        melee: {
            insect_glaive: {
                name: "Insect Glaive",
                valid_elements: []
            }, 
            great_sword: {
                name: "Great Sword",
                valid_elements: []
            }, 
            longsword: {
                name: "Longsword",
                valid_elements: []
            }, 
            lance: {
                name: "Lance",
                valid_elements: []
            }, 
            sword_and_shield: {
                name: "Sword and Shield",
                valid_elements: []
            }, 
            dual_blades: {
                name: "Dual Blades",
                valid_elements: []
            }, 
            hammer: {
                name: "Hammer",
                valid_elements: []
            }, 
            hunting_horn: {
                name: "Hunting Horn",
                valid_elements: []
            },
            gunlance: {
                name: "Gunlance",
                valid_elements: []
            },
            switchaxe: {
                name: "Switchaxe",
                valid_elements: []
            },
            chargeblade: {
                name: "Chargeblade",
                valid_elements: []
            }
        },
        ranged: {
            bow: {
                name: "Bow",
                valid_ammo: []
            },
            light_bowgun: {
                name: "Light Bowgun",
                valid_ammo: []
            },
            heavy_bowgun: {
                name: "Heavy Bowgun",
                valid_ammo: []
            }
        }
    }
}


// This sets up and exports the command class
// module.exports is what allows it to be used outside of this file
module.exports = class mhWeaponSelector extends commando.Command {

    // This is the constructor
    // When the command is first added to the list,
    // this defines what the command is called by,
    // and described as in the !help command
    // (the help command is auto generated via commando)
    constructor(client){
        super(client,{
            name: 'mhweapon', // how the command is called
            group: 'game', // The group (or folder) that the command is in
            memberName: 'mhweapon', 
            description: 'Generates a random Monster Hunter weapon type and element for a specified game', // The description that appears in the !help command.
            args: [{ // args is the list of arguments the command requires
                key: 'game', // the required argument
                prompt: 'The game that you want the weapon type to be selected from', // the prompt that appears when the command is entered incorrectly (missing a key)
                type: 'string', // the type that the arg is.  It will most often be a string.
                oneOf: ['mhw'],
                default: 'mhw'
            }, {
                key: 'weaponType',
                prompt: 'The weapon type that you want to play.  Only use if you want to have a specific weapon',
                type: 'string',
                oneOf: ['melee', 'ranged', 'any', 'ls', 'gl', 'sns', 'gs', 'ig', 'l', 'db', 'b', 'lb', 'hb', 'h', 'hh', 'sa', 'cb'],
                default: 'any'
            }],
            guildOnly: false // this controls if the command needs to be ran in a guild or not.  Some commands require this.
            // There are more that I will add as I learn/use them
        })
    }
    
    // This is what the command actually does
    // It runs when it can, and does exactly what is coded
    async run(message, { game, weaponType }) {

        var weaponGroup = ''
        if(weaponType === 'any') {
            weaponGroup = randomGrab(allOptions[game])
            weaponType = randomGrabObj(allOptions[game][weaponGroup]).name
        } else if (weaponType === 'melee') {
            weaponGroup = 'melee'
            weaponType = randomGrabObj(allOptions[game][weaponGroup]).name
        } else if (weaponType === 'ranged') {
            weaponGroup = 'ranged'
            weaponType = randomGrabObj(allOptions[game][weaponGroup]).name
        } else {
            switch (weaponType) {
                case 'ls':
                    weaponGroup = 'melee' 
                    weaponType = 'Longsword'
                    break
                case 'gl':
                    weaponGroup = 'melee'
                    weaponType = 'Gun Lance'
                    break
                case 'sns':
                    weaponGroup = 'melee'
                    weaponType = 'Sword and Shield'
                    break
                case 'gs':
                    weaponGroup = 'melee'
                    weaponType = 'Great Sword'
                    break
                case 'ig':
                    weaponGroup = 'melee'
                    weaponType = 'Insect Glaive'
                    break
                case 'l':
                    weaponGroup = 'melee'
                    weaponType = 'Lance'
                    break
                case 'db':
                    weaponGroup = 'melee' 
                    weaponType = 'Dual Blades'
                    break
                case 'b':
                    weaponGroup = 'ranged' 
                    weaponType = 'Bow'
                    break
                case 'lb':
                    weaponGroup = 'ranged' 
                    weaponType = 'Light Bowgun'
                    break
                case 'hb':
                    weaponGroup = 'ranged' 
                    weaponType = 'Heavy Bowgun'
                    break
                case 'h':
                    weaponGroup = 'melee' 
                    weaponType = 'Hammer'
                    break
                case 'hh':
                    weaponGroup = 'melee' 
                    weaponType = 'Hunting Horn'
                    break
                case 'sa':
                    weaponGroup = 'melee' 
                    weaponType = 'Switchaxe'
                    break
                case 'cb':
                    weaponGroup = 'melee' 
                    weaponType = 'Chargeblade'
                    break
                default: break
            }
        }

        var embed = new RichEmbed.RichEmbed()
        .addField("Game: ", game)
        .addField('Weapon Group: ', weaponGroup)
        .addField('Weapon Type: ', weaponType)
        

        // example message output
        message.channel.send(embed)
    }
}

function randomGrab(obj) {
    var keys = Object.keys(obj)
    return keys[ keys.length * Math.random() << 0]
}

function randomGrabObj(obj) {
    var keys = Object.keys(obj)
    return obj[keys[ keys.length * Math.random() << 0]]
}