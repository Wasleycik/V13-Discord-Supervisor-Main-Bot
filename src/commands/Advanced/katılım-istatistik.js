const { MessageEmbed } = require("discord.js");
const moment = require("moment")
require('moment-duration-format');
const config = require("../../../config.json");
const db = require("quick.db");

module.exports = {
    name: "katılım",
    aliases: ["servers", "katılımbilgi"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.Guild.GuildOwnerRole)) return message.reply({ embeds: [embed.setDescription(`Öncelikle geçerli yetkin olmalı!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
if(message.channel.id !== config.channels.botkomut) return message.reply({content: `Bu komutu Sadece <#${config.channels.botkomut}> kanalında kullanmalısın.`})
        message.reply({ embeds: [embed.setDescription(`
   
    \`•\` Sunucuda toplam **${guild.memberCount}** kişi bulunmakta.
    \`•\` Son 1 Saatte Giren Üyeler  **${guild.members.cache.filter(a => (new Date().getTime() - a.joinedTimestamp) < 3600000).size}**
    \`•\` Son 1 Günde Giren Üyeler  **${guild.members.cache.filter(a => (new Date().getTime() - a.joinedTimestamp) < 86400000).size}**
    \`•\` Son 1 Haftada Giren Üyeler **${guild.members.cache.filter(a => (new Date().getTime() - a.joinedTimestamp) < 604800000).size}**
    \`•\` Son 1 Ayda Giren Üyeler **${guild.members.cache.filter(a => (new Date().getTime() - a.joinedTimestamp) < 2629800000).size}**`)] })

 let data = db.get(`kmtlog.${message.guild.id}`);
client.channels.cache.get(config.logs.komutlog).send({ embeds: [embed.setDescription(` 

<@${data.mesajyazan}> İsimli Üye \`(${moment(Date.now()).format("LLL")})\`  Tarihinde <#${data.kanal}> Kanalında Komut Kullandı : **${data.mesaj}**`)] });

    }
};