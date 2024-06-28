const { Client, Collection, GatewayIntentBits } = require("discord.js");

const config = require('cfg-lib'); 
let discordConf = new config.Config("./Config/config.cfg")

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers, // Needed for managing members and events
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.MessageContent, // Privileged intent for accessing message content
        // Add additional intents as needed
    ],
    fetchAllMembers: true,
});
module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();


// Initializing the project
require("./Handlers")(client);
let token = discordConf.get('bot_dev.token')

client.login(token);