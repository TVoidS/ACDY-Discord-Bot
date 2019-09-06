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

        /** OLD CODE.  UPDATING

        // the string that defines what group you can find the weapon in
        // This is will be filled in the input parsing stage, possibly at generation, if 'any' was selected
        var weaponGroup = "" 

        // The string that specifies what weapon it is (e.g. lance)
        // it will also be filled in the parsing stage, possibly at generation, if 'any' was selected
        var weaponType = ""
        
        // The element, or modifier.  
        // This will either be filled in the parsing stage or the generation stage
        var wElement = ""

        // The display that will appear for the item
        // It will be selected when the system knows what the weaponType is, as it is fully dependent on that.
        var displayModifier = "Element"

        //Check the current game selection: (most likely mhw)
        if(game == 'mhw') {
            if(type == 'any') {
                weaponGroup = randomGrab(weaponList[game])
                weaponType = randomGrab(weaponList[game][weaponGroup])
                displayModifier = randomGrab(weaponList[game][weaponGroup][weaponType])
            } 
            else if(type == 'ranged') {
                weaponGroup = 'Ranged'
                weaponType = randomGrab(weaponList[game][weaponGroup])
                displayModifier = randomGrab(weaponList[game][weaponGroup][weaponType])
            }
            else if(type == 'melee') {
                weaponGroup = 'Melee'
                weaponType = randomGrab(weaponList.mhw[weaponGroup])
                displayModifier = randomGrab(weaponList.mhw[weaponGroup][weaponType])
            }
            else if(type == 'ig' || type == 'insectglaive') {
                weaponGroup = 'Melee'
                weaponType = 'Insect Glaive'
            }
            else if(type == 'gs' || type == 'greatsword') {
                weaponGroup = 'Melee'
                weaponType = 'Greatsword'
            }
            else if(type == 'ls' || type == 'longsword') {
                weaponGroup = 'Melee'
                weaponType = 'Longsword'
            }
            else if(type == 'l' || type == 'lance') {
                weaponGroup = 'Melee'
                weaponType = 'Lance'
            }
            else if(type == 'sns' || type == 'swordnshield' || type == 'swordandshield') {
                weaponGroup = 'Melee'
                weaponType = 'Sword and Shield'
            }
            else if(type == 'db' || type == 'dualblades') {
                weaponGroup = 'Melee'
                weaponType = 'Dual Blades'
            }
            else if(type == 'h' || type == 'hammer') {
                weaponGroup = 'Melee'
                weaponType = 'Hammer'
            }
            else if(type == 'hh' || type == 'huntinghorn') {
                displayModifier = "Notes"
                weaponGroup = 'Melee'
                weaponType = 'Hunting Horn'
            }
            else if(type == 'gl' || type == 'gunlance') {
                displayModifier = "Shelling"
                weaponGroup = 'Melee'
                weaponType = 'Gunlance'
            }
            else if(type == 'sa' || type == 'switchaxe') {
                weaponGroup = 'Melee'
                weaponType = 'Switchaxe'
            }
            else if(type == 'cb' || type == 'chargeblade') {
                weaponGroup = 'Melee'
                weaponType = 'Charge Blade'
            }
            else if(type == 'b' || type == 'bow') {
                displayModifier = "Coating"
                weaponGroup = 'Ranged'
                weaponType = 'Bow'
            }
            else if(type == 'lb' || type == 'lightbowgun') {
                displayModifier = "Ammo"
                weaponGroup = 'Ranged'
                weaponType = 'Light Bowgun'
            }
            else if(type == 'hb' || type == 'heavybowgun') {
                displayModifier = "Ammo"
                weaponGroup = 'Ranged'
                weaponType = 'Heavy Bowgun'
            }
            else {
                // If it gets here, then it is an element, not a weapon type, and therefore needs to be filtered to the appropriate group...
                // oof
                message.channel.send("You selected an element!\nI currently do not support element selection, please be patient!\nI'm going to instead generate a random weapon!")
                weaponGroup = randomGrab(weaponList[game])
                weaponType = randomGrab(weaponList[game][weaponGroup])
                displayModifier = randomGrab(weaponList[game][weaponGroup][weaponType])
            }
        } else {
            console.log("Incorrect input for !mhweapon command! -- WRONG GAME")
            message.channel.send("Incorrect Game! -- Tell the dev that this happned! (it shouldn't).\nGenerating a random weapon regardless")
            weaponGroup = randomGrab(weaponList[game])
            weaponType = randomGrab(weaponList[game][weaponGroup])
            displayModifier = randomGrab(weaponList[game][weaponGroup][weaponType])
        }

        var modifiers = weaponList[game][weaponGroup][weaponType][displayModifier]
        wElement = modifiers[modifiers.length * Math.random() << 0] // The bit shift by 0 drops the decimals

        var embed = new RichEmbed.RichEmbed()
        .addField("Game: ", game)
        .addField('Weapon Group: ', weaponGroup)
        .addField('Weapon Type: ', weaponType)
        .addField('Weapon ' + displayModifier + ': ', wElement)
        

        // example message output
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