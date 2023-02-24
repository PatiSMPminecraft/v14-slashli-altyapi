const fs = require('fs');
const logger = require("../utils/logger.js")
module.exports = (client) => {
  const events = fs.readdirSync("./events/").filter(f => f.split(".").pop() === "js");
    events.forEach(f => {
    var event = require(`../events/${f}`);    
    client.on(event.name, (...args) => event.run(client, ...args));
    logger.success(`Loaded Event: ${event.name}`)
  });
};