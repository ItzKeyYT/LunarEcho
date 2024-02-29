const { Client, Collection, Partials, ActivityType, IntentsBitField } = require('discord.js');
const readline = require('readline');
const fs = require('fs');
var colors = require('colors');
require('dotenv').config();

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
    ],
    partials: [
        Partials.Message,
        Partials.Channel,
        Partials.Reaction,
        Partials.GuildMember,
        Partials.User,
    ]
});

module.exports = client;

// Load the handlers
fs.readdirSync(`./handlers`).forEach((handler) => {
    require(`./handlers/${handler}`)(client);
});

// Function to prompt user for bot token
function promptForToken() {
    // Create an interface to read input from the user
    const tokenInterface = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    tokenInterface.question('Enter your bot token: ', (token) => {
      // Write token to .env file
      fs.writeFileSync('.env', `DISCORD_TOKEN=${token}`);
      client.login(token).catch(error => {
        console.error('An error occurred while logging in:\n', error);
        promptForToken(); // Retry login if error occurs
      });
      tokenInterface.close();
    });
};
  
// If the bot token is provided as an argument
if (process.argv[2]) {
    console.log("Note: We recommended you provide the bot token into the .env file (DISCORD_TOKEN) for the long run.");
    client.login(process.argv[2]).catch(error => {
        console.log('An error occurred while logging in:\n', error);
        process.exit(1); // Exit the process if error occurs
    });
} else if (process.env.DISCORD_TOKEN) { // If the bot token is stored in .env file
    client.login(process.env.DISCORD_TOKEN).catch(error => {
      console.error('An error occurred while logging in\n:', error);
      promptForToken(); // Prompt for token if error occurs
    });
  } else {
    console.log("No bot token found.");
    console.log("Note: We recommended you provide the bot token into the .env file (DISCORD_TOKEN) for the long run.");
    promptForToken();
};