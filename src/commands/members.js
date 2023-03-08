const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("members")
        .setDescription("Replies with the number of members in the server"),
    async execute(interaction) {
        await interaction.reply(
            `There are ${interaction.guild.memberCount} members in this server!`
        );
    },
};
