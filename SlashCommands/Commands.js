const { Slash } = require("@discordjs/builders")

module.exports = {
    data: new Slash()
    .setName('register')
    .setDescription('Register your guild to Advance Support Tools Network'),
};