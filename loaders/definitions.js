const { EmbedBuilder, resolveColor } = require("discord.js")
const config = require("../config.js")
module.exports = client => {
    client.config = config;
    global.client = client
    client.utils = {
        logger: require("../utils/logger.js"),
        findCommand: require("../utils/findCommand.js")
    }
    client.error = async function error(interaction, desc, ephemeral) {
        return await interaction.reply({
            embeds: [new EmbedBuilder()
                .setTitle("Error")
                .setColor(resolveColor("Red"))
                .setDescription(desc)
            ],
            ephemeral: ephemeral || false,
        }
        )
    };
    client.success = async function success(interaction, desc, ephemeral) {
        return await interaction.reply({
            embeds: [new EmbedBuilder()
                .setTitle("Successful")
                .setColor(resolveColor("Green"))
                .setDescription(desc)
            ],
            ephemeral: ephemeral || false,
        }
        )
    };
    client.warn = async function warn(interaction, desc, ephemeral) {
        return await interaction.reply({
            embeds: [new EmbedBuilder()
                .setTitle("Warn")
                .setColor(resolveColor("Gold"))
                .setDescription(desc)
            ],
            ephemeral: ephemeral || false,
        }
        )
    };
    client.commands = [
        {
            name: 'ping',
            desc: 'Ping Pong!',
            aliases: ["pong"],
            category: 'Bot',
            reqPermMember: 'NONE',
            reqPermBot: 'NONE'
        }
    ]
}