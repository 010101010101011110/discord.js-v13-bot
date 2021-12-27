const Discord = require("discord.js");
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS,Discord.Intents.FLAGS.GUILD_MEMBERS,Discord.Intents.FLAGS.GUILD_BANS,Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,Discord.Intents.FLAGS.GUILD_INTEGRATIONS,Discord.Intents.FLAGS.GUILD_WEBHOOKS,Discord.Intents.FLAGS.GUILD_INVITES,Discord.Intents.FLAGS.GUILD_VOICE_STATES,Discord.Intents.FLAGS.GUILD_PRESENCES,Discord.Intents.FLAGS.GUILD_MESSAGES,Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,Discord.Intents.FLAGS.DIRECT_MESSAGES,Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING] });
const fs = require("fs");
const moment = require("moment");
const config = require("./config.js");

client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();


/*              COMMAND FILES              */

const commander = fs.readdirSync('./commands').filter(files => files.endsWith('.js'));
for (const files of commander) {
	const command = require(`./commands/${files}`);
    client.commands.set(command.name, command);
    const date = new Date()
    console.log("["+ moment(date).format("DD/MM/YYYY HH:mm") + "]: Command named " + command.name + " is loaded")
}

/*              COMMAND FILES              */

/*               EVENT FILES               */

const requestEvent = (event) => require(`./events/${event}`)
client.on('messageCreate', (messageCreate) => requestEvent('message')(messageCreate,client));

/*               EVENT FILES               */

client.on("ready", async () => {

    client.user.setPresence({ activities: [{ name: config.activities }] });
    console.log('Im Ready.')

})


client.login(config.token)