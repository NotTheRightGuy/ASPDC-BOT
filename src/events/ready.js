const { Events } = require("discord.js");

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        console.log(`Logged in as ${client.user.tag}! and we are Online!!`);
        // This is where you would put your code to deploy commands to the guilds
    },
};
