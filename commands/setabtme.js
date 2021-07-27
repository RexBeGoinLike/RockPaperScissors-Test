const Database = require("@replit/database")
const Discord = require('discord.js');
const client = new Discord.Client();
//databases
const aboutme = new Database()


module.exports = {
	name: 'setabtme',
	description: 'Update about me section of profile',
	execute(message, args) {
    if(!args.length){
      message.reply("Your about me section can't be empty")
    }else{
      newaboutme = message.content.split("!setabtme ")[1];
      aboutme.set(message.author.id, newaboutme).then(() => {});
      message.reply("Update successful!");
      }
    }
  }