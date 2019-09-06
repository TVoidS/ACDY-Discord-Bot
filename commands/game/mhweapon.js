// This allows the command to use the discord.js-commando command system
// It also sets up the requirements.
const commando = require('discord.js-commando')
const RichEmbed = require('discord.js')
const fs = require('fs')

// Object with all weapons and types available
var weaponList = JSON.parse(fs.readFileSync(__dirname + '/mhweapons.json'))

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
            guildOnly: false, // this controls if the command needs to be ran in a guild or not.  Some commands require this.
            // There are more that I will add as I learn/use them
            args: [
                {
                    key:'game',
                    prompt: 'This defaults to mhw, so under a single line entry, you can leave it empty.  Please enter mhw though if you see this prompt',
                    oneOf: [
                        "mhw",
                        "xx"
                    ],
                    default: 'mhw',
                    type: 'string'
                },
                {
                    key: 'type',
                    prompt: 'Enter any, ranged, or melee',
                    oneOf: [
                        "any",
                        "ranged",
                        "melee"
                    ],
                    default: 'any',
                    type: 'string'
                }
            ]
        })
    }
    
    // This is what the command actually does
    // It runs when it can, and does exactly what is coded
    async run(message, {game, type}) {

        /** OLD ELEMENT CODE.  UPDATING

        // The element, or modifier.  
        // This will either be filled in the parsing stage or the generation stage
        let wElement = ""

        // The display that will appear for the item
        // It will be selected when the system knows what the weaponType is, as it is fully dependent on that.
        let displayModifier = "Element"

        let modifiers = weaponList[game][weaponGroup][weaponType][displayModifier]
        wElement = modifiers[modifiers.length * Math.random() << 0] // The bit shift by 0 drops the decimals

        let embed = new RichEmbed.RichEmbed()
        .addField("Game: ", game)
        .addField('Weapon Group: ', weaponGroup)
        .addField('Weapon Type: ', weaponType)
        .addField('Weapon ' + displayModifier + ': ', wElement)
        
        message.channel.send(embed)

        END OLD CODE */



        /** NEW CODE: */

        // Select Game
        if(game == 'mhw' || game == 'xx') {

            let weapon = selectWeapon(game, type)

            sendWeapon(message, game, weapon.wgroup, weapon.wtype)

        } else {
            
            console.log("Incorrect input for !mhweapon command! -- INVALID GAME")
            message.channel.send("Invalid Game! -- Tell the dev that this happned! (it shouldn't).\nGenerating a random weapon regardless")

            let weapon = selectWeapon('mhw','any')

            sendWeapon(message, game, weapon.wgroup, weapon.wtype)
        }
    }
}

/** selectWeapon
 * This function will take the game and type input and return the weapon selection as an object
 * 
 * @param {*} game - The game that the weapon is supposed to be selected from
 * @param {*} type - The type of weapon (Options: Any, Ranged, Melee)
 */
function selectWeapon(game, type) {

    // the string that defines what group you can find the weapon in
    // This is will be filled in the input parsing stage, possibly at generation, if 'any' was selected
    let weaponGroup = "" 

    // The string that specifies what weapon it is (e.g. lance)
    // it will also be filled in the parsing stage, possibly at generation, if 'any' was selected
    let weaponType = ""

    if(type == 'ranged') {
        // Select a ranged weapon
        //
        weaponGroup = "Ranged"
        weaponType = randomGrab(weaponList[game][weaponGroup])
    } else if (type == 'melee') {
        // Select a melee weapon
        //
        weaponGroup = "Melee"
        weaponType = randomGrab(weaponList[game][weaponGroup])
    } else {
        // assuming 'any'
        //
        let anyWeaponTempArr = randomItem(weaponList[game]["All"])
        weaponGroup = anyWeaponTempArr[1] // The second item is the group the weapon is in (Melee, Ranged, Special)
        weaponType = anyWeaponTempArr[0] // The first item is the actual weapon itself (e.g. Lance, SnS, Dual Blades)
    }

    return {wgroup: weaponGroup, wtype: weaponType}
}

// Assembles and sends the message
function sendWeapon(message, game, weaponGroup, weaponType) {

    var embed = new RichEmbed.RichEmbed()
        .addField("Game: ", game)
        .addField('Weapon Group: ', weaponGroup)
        .addField('Weapon Type: ', weaponType)
        //.addField('Weapon ' + displayModifier + ': ', wElement)
    
    // Element is being turned off for now.

    // Actual message sending
    message.channel.send(embed)
}

// Randomly grabs a key from an object
function randomGrab(obj) {
    var keys = Object.keys(obj)
    return keys[ keys.length * Math.random() << 0]
}

// Randomly grabs a sub-object from an object
function randomGrabObj(obj) {
    var keys = Object.keys(obj)
    return obj[keys[ keys.length * Math.random() << 0]]
}

// Randomly grabs an item from an array
function randomItem(arr) {
    return arr[arr.length * Math.random() << 0]
}