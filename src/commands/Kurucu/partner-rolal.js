const config = require("../../../config.json")
const db = require('quick.db');
const Discord = require("discord.js");
const moment = require("moment");
const limit = new Map();
moment.locale("tr");
module.exports = {
    name: "partner-seçim",
    aliases: ["partner"],

    execute: async (client, message, args, embed, author, channel, guild) => {
        if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.Guild.GuildOwnerRole)) return message.reply({ embeds: [embed.setDescription(`Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
  
       message.delete()
      let button1 = new Discord.MessageButton()
          .setStyle('SUCCESS')
          .setEmoji('➰')
          .setLabel('Partner Rol')
          .setCustomId('partner')
     
  
      let row = new Discord.MessageActionRow()
          .addComponents(button1,)
      
    
  
      message.channel.send({ content:`Butona Basarak <@&${config.buttons.partner}> Rolünü Alablirsin
  
      `, components: [row]  }) ;
  
  
  
  
    }
}
