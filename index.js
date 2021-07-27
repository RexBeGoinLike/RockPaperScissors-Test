const Discord = require('discord.js');
const client = new Discord.Client();
const {prefix} = require('./config.json');
const Database = require("@replit/database")
const fs = require("fs");
client.commands = new Discord.Collection();

//databases
const aboutme = new Database()

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once("ready", () => {
	console.log("Ready!");
});

client.on("message", message => {
  if(!message.content.startsWith(`${prefix}`) || message.author.bot) return;

 
  const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});
client.login(process.env.TOKEN)