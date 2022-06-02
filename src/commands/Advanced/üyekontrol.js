const Discord = require("discord.js")
const config = require("../../../config.json");
const db = require("quick.db"); 
const moment = require("moment");
moment.locale("tr");


module.exports = {
    name: "kontrol",
    aliases: ["üyekontrol", "ükontrol"],
    execute: async (client, message, args, embed, author, channel, guild) => {

 if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.Guild.GuildOwnerRole) && !message.member.permissions.has(8)) return message.reply({ embeds: [embed.setDescription(`Komutu kullanmak için geçerli yetkin olmalı!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));

if(message.channel.id !== config.channels.botkomut) return message.reply({content: `Bu komutu Sadece <#${config.channels.botkomut}> kanalında kullanmalısın.`})

let csonline = message.guild.members.cache.filter(cs => cs.presence?.status === "online").size
let csdnd = message.guild.members.cache.filter(cs => cs.presence?.status === "dnd").size
let csidle = message.guild.members.cache.filter(cs => cs.presence?.status === "idle").size
let csoff = message.guild.members.cache.filter(cs => cs.presence?.status === "offline").size

let css = csonline+csidle+csdnd

let cse = new Discord.MessageEmbed()
.setTitle(message.guild.name+" - Üye Durumları")
.setColor("GREEN")
.setThumbnail(message.guild.iconURL())
.addField("Toplam Online", `\`${csonline}\``)
.addField("Toplam DND", `\`${csdnd}\``)
.addField("Toplam Idle", `\`${csidle}\``)
.addField("Toplam Offline", `\`${csoff}\``)
.addField("Toplam Durum", `\`${css}\``)
.addField("Toplam Üye", `\`${message.guild.memberCount}\``)
.setTimestamp()
message.reply({ embeds: [cse] })

let data = db.get(`kmtlog.${message.guild.id}`);
client.channels.cache.get(config.logs.komutlog).send({ embeds: [embed.setDescription(` 

<@${data.mesajyazan}> İsimli Üye \`(${moment(Date.now()).format("LLL")})\`  Tarihinde <#${data.kanal}> Kanalında Komut Kullandı : **${data.mesaj}**`)] });
}}