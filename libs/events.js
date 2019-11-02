let { prefix } = require('../config.json')
var date = new Date();

module.exports = client => {
    client.on("message", async message => {
        if (message.channel.type === "dm") return;

        if (!message.content.startsWith(prefix)) return;

        if (message.author.bot) return;
        let messageArray = message.content.split(" ");
        let cmd = messageArray[0];
        const args = message.content.slice(prefix.length).split(/ +/g);
        const command = args.shift().toLowerCase()

        let commandfile = client.commands.get(command.toLowerCase());
        if(!commandfile) return;
        commandfile.run(client, message, args);
    });
    client.on('ready', () => {
        console.log(`Logged in as ${client.user.tag} at ${date}`)
    })
}