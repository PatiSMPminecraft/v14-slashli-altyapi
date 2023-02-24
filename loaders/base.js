const config = require("./../config.js");
const { OAuth2Scopes, Client, GatewayIntentBits, Partials, Collection } = require("discord.js");
const chalk = require("chalk")
module.exports = class extends Client {

  constructor() {
    super({

      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.MessageContent
      ],

      scopes: [OAuth2Scopes.Bot, OAuth2Scopes.ApplicationsCommands],
      partials: [Partials.Message, Partials.Channel, Partials.Reaction, Partials.User, Partials.GuildMember],
    });
    global.client = this
    this.slashcmds = new Collection();
    this.messagecmds = new Collection();
    this.contextcmds = new Collection();
    this.aliases = new Collection()
    process.on("unhandledRejection", (reason, promise) => {
      if (reason === "DiscordAPIError[10062]: Unknown interaction" || reason === "DiscordAPIError[40060]: Interaction has already been acknowledged.") return;
      console.log(`${chalk.red("--------------------------------------------------")}`)
      console.log(`${chalk.red("[Error Handler]: Unhandled Rejection")}`)
      console.error(reason, promise)
      console.log(`${chalk.red("--------------------------------------------------")}`)
    })
    process.on("uncaughtException", (err) => {
      if (err === "DiscordAPIError[10062]: Unknown interaction" || err === "DiscordAPIError[40060]: Interaction has already been acknowledged.") return;
      console.log(`${chalk.red("--------------------------------------------------")}`)
      console.log(`${chalk.red("[Error Handler]: Uncaught Exception")}`)
      console.error(err)
      console.log(`${chalk.red("--------------------------------------------------")}`)
    })
  }

  loader() {
    require("./definitions.js")(this)
    require("../loaders/event.js")(this);
    require("../loaders/command.js")(this);
    require("../loaders/listeners.js")(this);
    this.login(config.bot.token).catch(e => console.error(e))
  };
};
