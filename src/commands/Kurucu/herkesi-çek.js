const Discord = require("discord.js");
const ms = require("ms");
const config = require("../../../config.json");
const db = require("quick.db"); 
const moment = require("moment");
moment.locale("tr");

module.exports = {
    name: "herkesi-çek",
    aliases: ["herkesiçek"],
    execute: async (client, message, args, embed, author, channel, guild) => {
 if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({content: "`Bu komutu kullanmak için **YÖNETİCİ** yetkisine sahip olmalısın!`"});
const id = args[0]
if (!id)
return message.reply({ content: 'Üyelerin çekileceği kanal idsini giriniz.'});
message.guild.members.cache.filter(a => a.voice.channel).forEach(x => x.voice.setChannel(id))
message.channel.send({ content: `Bütün Sesli Kanaldaki Üyeler <#${id}> İsimli Odaya Taşındı`});

let data = db.get(`kmtlog.${message.guild.id}`);
client.channels.cache.get(config.logs.komutlog).send({ embeds: [embed.setDescription(` 

<@${data.mesajyazan}> İsimli Üye \`(${moment(Date.now()).format("LLL")})\`  Tarihinde <#${data.kanal}> Kanalında Komut Kullandı : **${data.mesaj}**`)] });
} }