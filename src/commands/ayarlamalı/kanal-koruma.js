const discord = require('discord.js')
const db = require('quick.db')
const config = require("../../../config.json");

module.exports = {
    name: "kanal-koruma",
    aliases: ['kanalkoruma', 'kkoruma', 'k-koruma'],
    execute: async (client, message, args, embed, author, channel, guild) => {


  if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.Guild.GuildOwnerRole)) return message.reply({ embeds: [embed.setDescription(`Komutu kullanmak için geçerli yetkin olmalı.`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));

if(args[0] === "sıfırla") {
const sıfırlandı = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())  
.setTitle(`${client.user.username} - Kanal Koruma Log Sıfırla `)
.setColor('BLACK')
.setDescription(`Kanal Koruma Log Kanalı Başarıyla Sıfırlandı ! `)
.setThumbnail(client.user.avatarURL())
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send({embeds: [sıfırlandı]}).then(x => {
  message.delete()
  setTimeout(() => {
    x.delete()
  }, 5000);
})
db.delete(`kayıtkanal_${message.guild.id}`)
return;
}

let kanal = message.mentions.channels.first();   
if (!kanal) {
  const ayarlanmadı = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())  
.setTitle(`${client.user.username} - Kanal Koruma Log Ayarla `)
.setColor('BLACK')
.setDescription(`Kanal Koruma Log Kanalı Belirtiniz !  `)
.setThumbnail(client.user.avatarURL())
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send({embeds: [ayarlanmadı]}).then(x => {
  message.delete()
  setTimeout(() => {
    x.delete()
  }, 5000);
})
  return;
}
db.set(`kkoruma_${message.guild.id}`, 'acik')
db.set(`kkorumalog_${message.guild.id}`, kanal.id)
const ayarlandı = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())  
.setTitle(`${client.user.username} - Kanal Koruma Log Ayarlandı `)
.setColor('BLACK')
.setDescription(` Kanal Koruma Log Kanalı ${kanal} Olarak Ayarlandı ! `)
.setThumbnail(client.user.avatarURL())
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send({embeds: [ayarlandı]}).then(x => {
  message.delete()
  setTimeout(() => {
    x.delete()
  }, 5000);
})
  
}}