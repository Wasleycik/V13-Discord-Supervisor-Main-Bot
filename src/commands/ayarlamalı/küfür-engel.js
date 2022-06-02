const Discord = require("discord.js");
const db = require("quick.db");
const config = require("../../../config.json");

module.exports = {
    name: "küfürengel",
    aliases: ["küfür-engel"],
    execute: async (client, message, args, embed, author, channel, guild) => {
 if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.Guild.GuildOwnerRole)) return message.reply({ embeds: [embed.setDescription(`Komutu kullanmak için geçerli yetkin olmalı.`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));

    if (!args[0] || !["aç", "kapat"].includes(args[0])){
      const ce = new Discord.MessageEmbed()
      .setTitle("LÜTFEN KOMUTU DOĞRU KULLAN")
      .setColor("RED")
      .addField("Sadece Belirli Bir Kanalda Açmak İçin", "`!küfür-engel aç #KANAL`")
      .addField("Tüm Sunucuda Açmak İçin", "`!küfür-engel aç`")
      .addField("Sistemi Belirli Bir Kanalda Kapatmak İçin", "`!küfür-engel kapat #KANAL`")
      .addField("Tüm Sunucuda Kapatmak İçin", "`!küfür-engel kapat`")
      message.channel.send({embeds: [ce]}).catch(e => {})
      }
  
  if(args[0] === "aç"){
    const cc = message.mentions.channels.first()
    if(cc){
      db.set("cd2."+cc.id+message.guild.id, "Kanal")
      message.channel.send({content: "**<#"+cc.id+"> İsimli Kanalda Küfür Engelleme Sistemi Açıldı!**" }).catch(e => {})
    } else {
      db.set("cd1."+message.guild.id, "Sunucu")
      message.channel.send({content: "**Küfür Engelleme Sistemi Tüm Sunucuda Açıldı!**" }).catch(e => {})
    }
  }
  
   if(args[0] === "kapat"){
    const cc = message.mentions.channels.first()
    if(cc){
      db.delete("cd2."+cc.id+message.guild.id)
      message.channel.send({content: "**<#"+cc.id+"> İsimli Kanalda Küfür Engelleme Sistemi Kapatıldı!**" }).catch(e => {})
    } else {
      db.delete("cd1."+message.guild.id)
      message.channel.send({content: "**Küfür Engelleme Sistemi Tüm Sunucuda Kapatıldı!**" }).catch(e => {})
    }
  }
}}