const { glob } = require('glob');
const { promisify } = require('util');
const logger = require("../utils/logger.js")
module.exports = async (client) => {
    const folder = await promisify(glob)("./commands/slash/*/*.js");
    const commands = [];
    const ownercommands = [];
    logger.info(`Loading Slash Commands`)
    folder.map((value) => {
        let file = require(`.${value}`);
        if (client.commands.filter(x => x.owner).map(x => x.name).includes(file.data.name)) {
            ownercommands.push(file.data.toJSON()) && client.slashcmds.set(file.data.name, file);
        } else {
            commands.push(file.data.toJSON())
            client.slashcmds.set(file.data.name, file);
        }
    });
    const folder2 = await promisify(glob)("./commands/context/*/*.js");
    logger.info(`Loading Context Commands`)
    folder2.map((value) => {
        let file = require(`.${value}`);
        commands.push(file.data.toJSON())
        client.contextcmds.set(file.data.name, file);
    });
    const folder3 = await promisify(glob)("./commands/message/*/*.js");
    logger.info(`Loading Message Commands`)
    folder3.map((value) => {
        let file = require(`.${value}`);
        client.messagecmds.set(file.command.name, file);
        client.utils.findCommand(file.command.name)?.aliases?.forEach(x => {
            client.aliases.set(x, file.command.name);
        })
    });
    client.on('ready', async () => {
        try {
            client.utils.logger.info(`Logged in as ${client.user.tag}`)
            client.user.setPresence({ activities: [{ name: client.config.presence.activity, type: "Playing" }], status: client.config.presence.status });
            if (client.config.project.changes === true) {
                client.application.commands.set(commands).then(logger.success("Global Slash Commands Are Loaded")).catch(e => console.log(e))
                client.application.commands.set(ownercommands, client.config.guilds.test.id).then(logger.success("Test Guild Slash Commands Are Loaded")).catch(e => console.log(e))
            }
        } catch (error) {
            console.log(error)
        }
    });
};