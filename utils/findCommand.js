function findCommand(name) {
    let result = global.client.commands.find(x => x.name === name) || null
    return result;

}
module.exports = findCommand