const { Events, EmbedBuilder } = require("discord.js");
var cron = require("node-cron");
const { exec } = require("node:child_process");
require("dotenv").config;
const POTDChannelID = process.env.POTD;

function formatDate(dateString) {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const parts = dateString.split("-");
    const day = parseInt(parts[2]);
    const month = months[parseInt(parts[1]) - 1];
    const year = parseInt(parts[0]);

    let suffix;
    if (day === 1 || day === 21 || day === 31) {
        suffix = "st";
    } else if (day === 2 || day === 22) {
        suffix = "nd";
    } else if (day === 3 || day === 23) {
        suffix = "rd";
    } else {
        suffix = "th";
    }

    return `${day}${suffix} ${month} ${year}`;
}

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        const POTDChannel = client.channels.cache.get(POTDChannelID);
        console.log(`Started Cron Scheduler\n1.Leetcode POTD -> 6:30AM ITC`);
        cron.schedule("*/30 * * * * *", () => {
            console.log("Running a task every 1 minute");
            exec("node src\\scripts\\leetcodeScrapper.js", (err, stdout) => {
                if (err) {
                    console.error(err);
                } else {
                    const stdoutArray = stdout.split("\n");
                    const todaydate = formatDate(stdoutArray[0]);
                    const link = stdoutArray[1];
                    const questionID = stdoutArray[2];
                    const title = stdoutArray[3];
                    const leetcodePOTDEmbed = new EmbedBuilder()
                        .setColor("#e63946")
                        .setTitle(`Leetcode Problem of the Day 📝 ${todaydate}`)
                        .setURL(`https://leetcode.com/problems${link}`)
                        .setAuthor({
                            name: "Adani Student Programming and Development Club",
                            iconURL: "https://i.ibb.co/2MRPBBw/ASPDC.jpg",
                        })
                        .setDescription(`**${questionID}${title}**`)
                        .setFooter({ text: "Happy Coding!" });
                    console.log(stdout);
                    POTDChannel.send({ embeds: [leetcodePOTDEmbed] });
                    console.log(
                        `Successfully sent ${todaydate} POTD! ${questionID}${title}`
                    );
                }
            });
        });
    },
};
