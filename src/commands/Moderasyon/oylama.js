const { MessageButton, MessageEmbed, MessageActionRow } = require("discord.js")
const Discord = require("discord.js")
const config = require("../../../config.json");
const db = require("quick.db"); 
const moment = require("moment");
moment.locale("tr");

module.exports = {
    name: "oylama",
    aliases: [],
    execute: async (client, message, args, embed, author, channel, guild) => {


 if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.Guild.GuildOwnerRole) && !message.member.permissions.has(8)) return message.reply({ embeds: [embed.setDescription(`Komutu kullanmak için geçerli yetkin olmalı!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
  let csc = message.mentions.channels.first();


let mesaj =  args.slice(0) .join(" ")
if(!mesaj) return message.reply("?")

let evet = new MessageButton()
.setStyle("SUCCESS")
.setLabel("(0) Evet")
.setCustomId("evet_oylama")
let hayır = new MessageButton()
.setStyle("DANGER")
.setLabel("(0) Hayır")
.setCustomId("hayır_oylama")

let expert = new MessageEmbed()
.setTitle("Oylama!")
.setDescription("> "+ mesaj)
.addField("Oyver", "> Oy vermek için **Evet** Veya **Hayır** butonuna tıklayın.")
.setColor("RANDOM")

message.channel.send({embeds: [expert], components: [new MessageActionRow({ components:  [evet, hayır] })] })

let data = db.get(`kmtlog.${message.guild.id}`);
client.channels.cache.get(config.logs.komutlog).send({ embeds: [embed.setDescription(` 

<@${data.mesajyazan}> İsimli Üye \`(${moment(Date.now()).format("LLL")})\`  Tarihinde <#${data.kanal}> Kanalında Komut Kullandı : **${data.mesaj}**`)] });

}}