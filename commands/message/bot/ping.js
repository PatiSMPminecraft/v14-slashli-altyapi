module.exports = {
    command: {
        name: "ping"
    },
    async run({ client, message }) {
       return message.reply({ content: `${client.ws.ping}ms` })
    },
}