const discord = require('discord.js')
const db = require('quick.db')
const config = require("../../../config.json");

module.exports = {
    name: "rol-koruma",
    aliases: ['rolkoruma', 'rkoruma', 'r-koruma'],
    execute: async (client, message, args, embed, author, channel, guild) => {

  if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.Guild.GuildOwnerRole)) return message.reply({ embeds: [embed.setDescription(`Komutu kullanmak için geçerli yetkin olmalı.`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));

if(args[0] === "sıfırla") {
const sıfırlandı = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())  
.setTitle(`${client.user.username} - Rol Koruma Sıfırla `)
.setColor('BLACK')
.setDescription(`Rol Koruma Kanalı Başarıyla Sıfırlandı ! `)
.setThumbnail(client.user.avatarURL())
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send({embeds: [sıfırlandı]}).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
db.delete(`rolk_${message.guild.id}`)
  db.delete(`rolklog_${message.guild.id}`)
return;
}

let kanal = message.mentions.channels.first();   
if (!kanal) {
  const ayarlanmadı = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL)  
.setTitle(`${client.user.username} - Rol Koruma Ayarla `)
.setColor('BLACK')
.setDescription(`Rol Koruma Kanalı Belirtiniz !  `)
.setThumbnail(client.user.avatarURL())
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send({embeds: [ayarlanmadı]}).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
  return;
}
db.set(`rolk_${message.guild.id}`, 'acik')
db.set(`rolklog_${message.guild.id}`, kanal.id)
const ayarlandı = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())  
.setTitle(`${client.user.username} - Rol Koruma Ayarlandı `)
.setColor('BLACK')
.setDescription(` Rol Koruma Kanalı ${kanal} Olarak Ayarlandı ! `)
.setThumbnail(client.user.avatarURL())
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send({embeds: [ayarlandı]}).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
  
}}