const { EmbedBuilder, resolveColor } = require("discord.js");
module.exports = {
    name: 'messageCreate',
    async run(client, message) {
        const prefix = client.config.bot.prefix
        let command = message.content.split(" ")[0].slice(prefix.length).toLowerCase()
        let args = message.content.split(" ")
        args.shift()
        const clientcmd = client.messagecmds.get(command) || client.messagecmds.get(client.aliases.get(command))
        if (!clientcmd) return;
        const cmd = client.commands.find(x => x.name === clientcmd.command.name)
        if (cmd?.owner === true && !client.config.bot.admins.includes(interaction.user.id)) return;
        if (cmd?.dm === false && !interaction.guild) return;
        const reqPermMember = cmd.reqPermMember.replace("Administrator", "Administrator").replace("ManageChannels", "Manage Channels").replace("ManageRoles", "Manage Roles").replace("ManageMessages", "Manage Messages").replace("ManageGuild", "Manage Server").replace("ModerateMembers", "Timeout Members").replace("BanMembers", "Ban Members").replace("KickMembers", "Kick Members").replace("ManageNicknames", "Manage Nicknames")
        const reqPermBot = cmd.reqPermBot.replace("Administrator", "Administrator").replace("ManageChannels", "Manage Channels").replace("ManageRoles", "Manage Roles").replace("ManageMessages", "Manage Messages").replace("ManageGuild", "Manage Server").replace("ModerateMembers", "Timeout Members").replace("BanMembers", "Ban Members").replace("KickMembers", "Kick Members").replace("ManageNicknames", "Manage Nicknames")
        if (cmd.reqPermMember !== "NONE") {
            if (!message.member.permissions.has(cmd.reqPermMember)) return message.reply({ embeds: [new EmbedBuilder().setTitle("Missing Permissions").setColor(resolveColor("Red")).setDescription(`You don't have this permission: \`${reqPermMember}\``)] })
        }
        if (cmd.reqPermBot !== "NONE") {
            if (!message.guild.members.me.permissions.has(cmd.reqPermBot)) return message.reply({ embeds: [new EmbedBuilder().setTitle("Missing Permissions").setColor(resolveColor("Red")).setDescription(`I don't have this permission: \`${reqPermBot}\``)] })
        }
        try {
            await clientcmd.run({ client, message, args, prefix })
        } catch (error) {
            if (error) {
                client.channels.cache.get(client.config.channels.errorLog)?.send({
                    content: `<@&${client.config.roles.errorPings}>`,
                    embeds: [
                        new EmbedBuilder()
                            .setTitle("Error (Legacy)")
                            .setColor(resolveColor("Red"))
                            .setDescription(`
\`Server:\` ${message.guild?.name || "DM"} | ${message.guild?.id || "DM"}
\`Channel:\` ${message.channel?.name || "DM"} ${message.channel?.id || "DM"}
\`User:\` ${message.author.tag} | ${message.author.id}
\`Command:\` ${cmd.name}
    
\`Error:\` \`\`\`js\n${error.toString().slice(0, 3000)}\`\`\` 
    `)
                    ]
                })
                console.error(error)
                return client.error(message, `There was an error while executing this command! Error has been submitted to developers. Join our [support server](${client.config.guilds.supportServer.invite}) for advanced help.`, true)
            }
        }
    }
}