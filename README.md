# ACDY-Discord-Bot
A Discord bot using Discord.js and Discord.js-commando.  This bot is under development for the ACDY Discord server and is subject to change.

# Commands:
- !help
    - Command that lists all available commands.  It will DM you with the list of commands.  This is provided via Discord.js-commando
- !ping
    - Tests the bot's response time to commands.  This command is provided by Discord.js-commando

# Setup:
1. Download and extract the .zip to a location you would like the bot to be in.  Preferrably somewhere easy to access via commandline (Desktop or C: drive are typically easy places).
2. Make sure you update the token-example.js file to be your tokens, and rename it to token.js
3. Install NodeJS (https://nodejs.org/en/).  The bot has been tested on 10.16.0, but should work with newer versions
4. Install FFMPEG (Download: https://ffmpeg.zeranoe.com/builds/ : Instructions: https://www.wikihow.com/Install-FFmpeg-on-Windows)
5. Open the command prompt and navigate to the Bot's folder (the one that has package.json in it) - You will need to be comfortable with the cd command for this step -
6. run the "dir" command and make sure that package.json is in the list, then run "npm install".  If this doesn't work, you may need to restart to allow the NodeJS installation to finalize.
7. Once that is done, run the command "node ."
8. It should work just fine after that.
