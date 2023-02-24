const { ContextMenuCommandBuilder, ApplicationCommandType, ActionRowBuilder, EmbedBuilder, ButtonBuilder } = require("discord.js");
module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('Avatar')
        .setType(ApplicationCommandType.User),
    async run({ client, interaction }) {
        const user = interaction.guild.members.cache.get(interaction.targetId).user
        if (!user) {
            return client.error(interaction, "Member not found.")
        } else {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.config.defaultEmbed.color)
                        .setImage(user.displayAvatarURL({ dynamic: true, size: 2048 })).setDescription(`[png](${user.displayAvatarURL({ dynamic: true, extension: 'png' })}) | [jpg](${user.displayAvatarURL({ dynamic: true, extension: 'jpg' })}) | [webp](${user.displayAvatarURL({ dynamic: true, extension: 'webp' })})`).setTitle(`Avatar for ${user.username}#${user.discriminator}`)
                ],
                components: [
                    new ActionRowBuilder().addComponents(
                        new ButtonBuilder().setStyle('Link').setLabel('Avatar').setURL(user.displayAvatarURL({ dynamic: true })),
                    ),
                ],
            });
        }
    }
}