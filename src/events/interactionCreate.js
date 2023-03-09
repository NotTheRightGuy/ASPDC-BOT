const { Events } = require("discord.js");

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isCommand()) return;

        const interactionUser = interaction.user.tag;
        const command = interaction.client.commands.get(
            interaction.commandName
        );
        console.log(
            `${interactionUser} issued the command ${interaction.commandName}`
        );
        if (!command) {
            console.error(
                `No Command matching ${interaction.commandName} was found`
            );
            return;
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(`Error executing ${interaction.commandName}:`);
            console.error(error);
        }
    },
};
