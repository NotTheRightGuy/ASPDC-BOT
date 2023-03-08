const cron = require("node-cron");
const { Events } = require("discord.js");
require("dotenv").config();

CHANNEL_ID = process.env.CHANNEL_ID;

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        const channel = client.channels.cache.get(CHANNEL_ID);
        cron.schedule("*/1 * * * *", () => {
            channel.send("Sending Message Every Minute");
        });
    },
};
