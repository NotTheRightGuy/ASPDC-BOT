const cron = require("node-cron");
require("dotenv").config();
const { Events, EmbedBuilder } = require("discord.js");
CHANNEL_ID = process.env.CHANNEL_ID;
const today = new Date();
const { exec } = require("child_process");

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        const POTD = client.channels.cache.get(CHANNEL_ID);
        cron.schedule("30 17 * * *", () => {
            exec("cd src//scrapper && node index.js", (err, stdout, stderr) => {
                if (err) {
                    console.error("exec error");
                    return;
                }
                console.log("Sending Todays Leetcode POTD to POTD Channel");
                const todayDate = today.toDateString();
                const title = stdout.split("$")[0];
                const url = stdout.split("$")[1];
                const embed = new EmbedBuilder()
                    .setColor("DF2E38")
                    .setTitle("LeetCode POTD " + todayDate)
                    .setURL(url)
                    .setDescription(title.toLocaleUpperCase())
                    .setThumbnail("https://i.ibb.co/2MRPBBw/ASPDC.jpg");
                POTD.send({ embeds: [embed] });
            });
        });
    },
};
