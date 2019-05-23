// This allows the command to use the discord.js-commando command system
// It also sets up the requirements.
const commando = require('discord.js-commando')
const RichEmbed = require('discord.js')
const fs = require('fs')

// Object with all weapons and types available
var allOptions = JSON.parse(fs.readFileSync(__dirname + '/mhweapons.json'))

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
                    key: 'arg1',
                    prompt: 'This can be anything really.  Select either an element, weapon group, or game to help filter your results',
                    oneOf: [
                        "any",
                        "ranged",
                        "melee",
                        "sleep",
                        "ice",
                        "raw",
                        "fire",
                        "water",
                        "thunder",
                        "dragon",
                        "blast",
                        "paralysis",
                        "ig",
                        "insectglaive",
                        "gs",
                        "greatsword",
                        "ls",
                        "longsword",
                        "l",
                        "lance",
                        "sns",
                        "swordnshield",
                        "swordandshield",
                        "db",
                        "dualblades",
                        "h",
                        "hammer",
                        "hh",
                        "huntinghorn",
                        "gl",
                        "gunlance",
                        "sa",
                        "switchaxe",
                        "cb",
                        "chargeblade",
                        "bow",
                        "b",
                        "lb",
                        "lightbowgun",
                        "hb",
                        "heavybowgun"
                    ],
                    default: 'any',
                    type: 'string'
                },
                {
                    key:'game',
                    prompt: 'This defaults to mhw, so under a single line entry, you can leave it empty.  Please enter mhw though if you see this prompt',
                    oneOf: [
                        "mhw"
                    ],
                    default: 'mhw',
                    type: 'string'
                }
            ]
        })
    }
    
    // This is what the command actually does
    // It runs when it can, and does exactly what is coded
    async run(message, {arg1, game}) {

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
            if(arg1 == 'any') {
                weaponGroup = randomGrab(allOptions[game])
                weaponType = randomGrab(allOptions[game][weaponGroup])
                displayModifier = randomGrab(allOptions[game][weaponGroup][weaponType])
            } 
            else if(arg1 == 'ranged') {
                weaponGroup = 'Ranged'
                weaponType = randomGrab(allOptions[game][weaponGroup])
                displayModifier = randomGrab(allOptions[game][weaponGroup][weaponType])
            }
            else if(arg1 == 'melee') {
                weaponGroup = 'Melee'
                weaponType = randomGrab(allOptions.mhw[weaponGroup])
                displayModifier = randomGrab(allOptions.mhw[weaponGroup][weaponType])
            }
            else if(arg1 == 'ig' || arg1 == 'insectglaive') {
                weaponGroup = 'Melee'
                weaponType = 'Insect Glaive'
            }
            else if(arg1 == 'gs' || arg1 == 'greatsword') {
                weaponGroup = 'Melee'
                weaponType = 'Greatsword'
            }
            else if(arg1 == 'ls' || arg1 == 'longsword') {
                weaponGroup = 'Melee'
                weaponType = 'Longsword'
            }
            else if(arg1 == 'l' || arg1 == 'lance') {
                weaponGroup = 'Melee'
                weaponType = 'Lance'
            }
            else if(arg1 == 'sns' || arg1 == 'swordnshield' || arg1 == 'swordandshield') {
                weaponGroup = 'Melee'
                weaponType = 'Sword and Shield'
            }
            else if(arg1 == 'db' || arg1 == 'dualblades') {
                weaponGroup = 'Melee'
                weaponType = 'Dual Blades'
            }
            else if(arg1 == 'h' || arg1 == 'hammer') {
                weaponGroup = 'Melee'
                weaponType = 'Hammer'
            }
            else if(arg1 == 'hh' || arg1 == 'huntinghorn') {
                displayModifier = "Notes"
                weaponGroup = 'Melee'
                weaponType = 'Hunting Horn'
            }
            else if(arg1 == 'gl' || arg1 == 'gunlance') {
                displayModifier = "Shelling"
                weaponGroup = 'Melee'
                weaponType = 'Gunlance'
            }
            else if(arg1 == 'sa' || arg1 == 'switchaxe') {
                weaponGroup = 'Melee'
                weaponType = 'Switchaxe'
            }
            else if(arg1 == 'cb' || arg1 == 'chargeblade') {
                weaponGroup = 'Melee'
                weaponType = 'Charge Blade'
            }
            else if(arg1 == 'b' || arg1 == 'bow') {
                displayModifier = "Coating"
                weaponGroup = 'Ranged'
                weaponType = 'Bow'
            }
            else if(arg1 == 'lb' || arg1 == 'lightbowgun') {
                displayModifier = "Ammo"
                weaponGroup = 'Ranged'
                weaponType = 'Light Bowgun'
            }
            else if(arg1 == 'hb' || arg1 == 'heavybowgun') {
                displayModifier = "Ammo"
                weaponGroup = 'Ranged'
                weaponType = 'Heavy Bowgun'
            }
            else {
                // If it gets here, then it is an element, not a weapon type, and therefore needs to be filtered to the appropriate group...
                // oof
                message.channel.send("You selected an element!\nI currently do not support element selection, please be patient!\nI'm going to instead generate a random weapon!")
                weaponGroup = randomGrab(allOptions[game])
                weaponType = randomGrab(allOptions[game][weaponGroup])
                displayModifier = randomGrab(allOptions[game][weaponGroup][weaponType])
            }
        } else {
            console.log("Incorrect input for !mhweapon command! -- WRONG GAME")
            message.channel.send("Incorrect Game! -- Tell the dev that this happned! (it shouldn't).\nGenerating a random weapon regardless")
            weaponGroup = randomGrab(allOptions[game])
            weaponType = randomGrab(allOptions[game][weaponGroup])
            displayModifier = randomGrab(allOptions[game][weaponGroup][weaponType])
        }

        var modifiers = allOptions[game][weaponGroup][weaponType][displayModifier]
        wElement = modifiers[modifiers.length * Math.random() << 0] // The bit shift by 0 drops the decimals

        var embed = new RichEmbed.RichEmbed()
        .addField("Game: ", game)
        .addField('Weapon Group: ', weaponGroup)
        .addField('Weapon Type: ', weaponType)
        .addField('Weapon ' + displayModifier + ': ', wElement)
        

        // example message output
        message.channel.send(embed)
    }
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
    return arr[arr.length * Math.random << 0]
}