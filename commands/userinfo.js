const Database = require("@replit/database")
const Discord = require('discord.js');
const client = new Discord.Client();
//databases
const aboutme = new Database()

module.exports = {
	name: "userinfo",
	description: "displays basic information about the user",
	execute(message, args) {
    
     
    aboutme.get(message.author.id).then(value => {
    if(!value || value < 1){
      aboutme.set(message.author.id, "Edit your about me section using \n!setabtme").then(() => {});
      }
    });

    if(!message.mentions.users.size){
      aboutme.get(message.author.id).then(userabout => {
        userprofile = new Discord.MessageEmbed()
          .setColor("#0099ff")
          .setTitle("#" + message.author.discriminator)
          .addField("About me", userabout)
          .setAuthor(message.author.username + "\'s profile", message.author.displayAvatarURL({dynamic: true}))
          .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
          .setDescription("UID: " + message.author.id + "\nAccount creation: " + message.author.createdAt + "\nDiscord tag: " + message.author.tag)
          .setTimestamp()
          .setURL("https://discord.js.com");
          message.channel.send(userprofile);
      });
    }else{
      aboutme.get(message.mentions.users.first().id).then(value => {
        if(!value || value < 1){
          if(message)
          aboutme.set(message.mentions.users.first().id, "Edit your About Me section by typing \n!setabtme").then(() => {});
        }
      });
        aboutme.get(message.mentions.users.first().id).then(userabout => {
          var mention = message.mentions.users.first()
          mentioned = new Discord.MessageEmbed()
          .setColor("Red")
          .setTitle("#"+ mention.discriminator)
          .addField("About me", userabout)
          .setAuthor(mention.username + "\'s profile", mention.displayAvatarURL({dynamic: true}))
          .setThumbnail(mention.displayAvatarURL({dynamic: true}))
          .setDescription("UID: " + mention.id + "\nAccount creation: " + mention.createdAt + "\nDiscord tag: " + mention.tag)
          .setTimestamp()
          .setURL("https://discord.js.org/");
          message.channel.send(mentioned);
        });
      }
    }
	};