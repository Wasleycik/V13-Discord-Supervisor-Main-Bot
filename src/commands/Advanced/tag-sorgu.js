const Discord = require("discord.js")
const config = require("../../../config.json");
const db = require("quick.db"); 
const moment = require("moment");
moment.locale("tr");

module.exports = {
    name: "tag-info",
    aliases: ["taginfo", "tinfo"],
    execute: async (client, message, args, embed, author, channel, guild) => {
 if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({content: "`Bu komutu kullanmak için **YÖNETİCİ** yetkisine sahip olmalısın!`"});
const cst = args.slice(0).join(" ")
if(!cst) return message.reply("Bir Tag Belirt!")
const sonuc = message.guild.members.cache.filter(mr => mr.user.username.includes(cst)).size
const sonuc2 = message.guild.members.cache.filter(mr => mr.user.username.includes(cst)).map(mr => mr).join('--')

message.reply("Belirtilen Taga Sahip Bu Sunucuda `"+sonuc+"` Kişi Var!")
 message.channel.send(`**Tagdaki Üyeler** ; \n${sonuc2 || "Kimse yok"}`)

let data = db.get(`kmtlog.${message.guild.id}`);
client.channels.cache.get(config.logs.komutlog).send({ embeds: [embed.setDescription(` 

<@${data.mesajyazan}> İsimli Üye \`(${moment(Date.now()).format("LLL")})\`  Tarihinde <#${data.kanal}> Kanalında Komut Kullandı : **${data.mesaj}**`)] });
}
}