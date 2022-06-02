const { MessageEmbed } = require("discord.js");
const config = require("../../../config.json");
const db = require("quick.db"); 
const moment = require("moment");
moment.locale("tr");


module.exports = {
    name: 'sesli',
    aliases: ["sesli-say", "ses"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.registration.staff) && !message.member.roles.cache.has(config.yetki.botcommand)) return message.reply({ embeds: [embed.setDescription(`Komutu kullanmak için geçerli yetkin olmalı.`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
if(message.channel.id !== config.channels.botkomut) return message.reply({content: `Bu komutu Sadece <#${config.channels.botkomut}> kanalında kullanmalısın.`})
        let sesli = message.guild.members.cache.filter(x => x.voice.channel).size
        let topses = message.guild.members.cache.filter(s => s.voice.channel);
        let yayın = topses.filter(s => s.voice.streaming);
        let mik = topses.filter(s => s.voice.selfMute).size;
        let kulak = topses.filter(s => s.voice.selfDeaf).size;
        let yetkili = message.guild.members.cache.filter(x => {
            return x.user.username.includes("XXXXXXXXXX") && x.voice.channel && x.roles.cache.has(config.youtube.staff)
        }).size
        message.reply({ embeds: [embed.setDescription(`
\`•\` Sesli kanallarında **${sesli}** kullanıcı bulunuyor.
\`•\` Sesli kanallarında **${yetkili}** yetkili bulunuyor.

Mikrofonu kapalı: **${mik}**
Kulaklığı kapalı: **${kulak}**
Yayında: **${yayın.size}** 
    `)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));

let data = db.get(`kmtlog.${message.guild.id}`);
client.channels.cache.get(config.logs.komutlog).send({ embeds: [embed.setDescription(` 

<@${data.mesajyazan}> İsimli Üye \`(${moment(Date.now()).format("LLL")})\`  Tarihinde <#${data.kanal}> Kanalında Komut Kullandı : **${data.mesaj}**`)] });
      
    }
}