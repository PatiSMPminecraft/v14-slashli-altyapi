const { resolveColor } = require("discord.js")
module.exports = {
    project: {
        changes: true /* Making this true will load all slash commands to global and test server in next start */
    },
    bot: {
        admins: [],
        token: "",
        prefix: "",
        invite: ""
    },
    presence: {
        activity: "Hello!",
        status: "online"
    },
    guilds: {
        test: {
            id: "",
            invite: ""
        },
        supportServer: {
            id: "",
            invite: ""
        },
    },
    channels: {
        errorLog: ""
    },
    roles: {
        errorPings: ""
    },
    defaultEmbed: {
        color: resolveColor("#5865F2")
    }
}