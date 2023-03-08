const fs = require("fs");
const path = require("path");

require("dotenv").config();
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");
const { Interface } = require("readline");
const token = process.env.TOKEN;

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

//Command Handler
client.commands = new Collection();
// Read all the files in the commands directory
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    if ("data" in command && "execute" in command)
        client.commands.set(command.data.name, command);
    else
        console.log(
            `[WARNING] The command at ${filePath} is missing a 'data' or 'execute' property.`
        );
}

// Read all the files in the events directory
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.login(token);
