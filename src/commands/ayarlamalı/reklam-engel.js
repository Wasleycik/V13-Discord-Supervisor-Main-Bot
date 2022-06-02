const Discord = require("discord.js");
const db = require("quick.db")
const config = require("../../../config.json")


module.exports = {
    name: "reklamengel",
    aliases: ["reklam-engel"],
    execute: async (client, message, args, embed, author, channel, guild) => {


       if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.Guild.GuildOwnerRole)) return message.reply({ embeds: [embed.setDescription(`Komutu kullanmak için geçerli yetkin olmalı.`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));

    if (!args[0] || !["ayarla", "log"].includes(args[0])){
      const ce = new Discord.MessageEmbed()
      .setTitle("LÜTFEN KOMUTU DOĞRU KULLAN")
      .setColor("RED")
      .addField("Reklam korumasını açmak için", "`/reklam ayarla`")
      .addField("Reklam log kanalını ayarlamak için", "`/reklam log #kanal`")
      message.channel.send({embeds: [ce]}).catch(e => {})
      }
  
  if(args[0] === "ayarla"){
     let reklam = db.fetch(`reklam.${message.guild.id}.durum`);
    if (reklam) {
      db.delete(`reklam.${message.guild.id}`);
      message.channel
        .send({ embeds: [
          new Discord.MessageEmbed()
            .setColor("#00ff00")
            .setDescription(
              `**Başarılı Bir Şekilde Reklam Engel Koruması Kapandı.**`
            )]}
        )
        .then(x => setTimeout(() => x.delete(), 5000));
    } else {
      db.set(`reklam.${message.guild.id}.durum`, true);
      message.channel
        .send({ embeds: [
          new Discord.MessageEmbed()
            .setColor("#00ff00")
            .setDescription(
              ` **Başarılı Bir Şekilde Reklam Engel Koruması Açıldı.**`
            )]}
        )
        .then(x => setTimeout(() => x.delete(), 5000))
        
    }
  };

   if(args[0] === "log"){
    let reklam = db.fetch(`reklam.${message.guild.id}.durum`);
    const member = new Discord.MessageEmbed()
      .setColor("#00ff00")
      .setDescription(` **HATA**  - Bir kanal etiketle.`);
    if (reklam) {
      let kanal = message.mentions.channels.first();
      if (!kanal) return message.channel.send({ embeds: [member]});
      db.set(`reklam.${message.guild.id}.kanal`, kanal.id);
  let embed = new Discord.MessageEmbed()
            .setColor("#00ff00")
            .setDescription(
              ` **Başarılı Bir Şekilde Reklam Log Kanalı Ayarlandı.** `
            )
      message.channel
        .send({embeds: [embed]})
        .then(x => setTimeout(() => x.delete(), 5000));
        
    } else {
  let embed1 = new Discord.MessageEmbed()
            .setColor("#00ff00")
            .setDescription(` **Reklam Engel Koruması Açık Değil**`)
      message.channel
        .send({embeds: [embed1]})
        .then(x => setTimeout(() => x.delete(), 5000))
        
      } }

}}