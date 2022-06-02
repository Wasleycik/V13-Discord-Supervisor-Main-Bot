const Discord = require('discord.js');
const db = require('quick.db');
const config = require("../../../config.json")
const moment = require("moment");
moment.locale("tr");

module.exports = {
    name: "afk",
    aliases: ["afk"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        if (message.member.displayName.startsWith("[AFK]")) return;
        
        let uye = guild.members.cache.get(author.id);
        let reason = args.slice(0).join(' ') || "Sebep belirtilmedi!";
        let nick = uye.displayName;
        db.set(`sebep_${author.id}_${guild.id}`, reason);
        db.set(`user_${author.id}_${guild.id}`, author.id);
        db.set(`afktime_${guild.id}`, Date.now());
        db.set(`nick_${author.id}_${guild.id}`, nick);
        let sebep = db.fetch(`sebep_${author.id}_${guild.id}`);
        message.member.setNickname(`[AFK] ` + nick).catch(err => console.log(" "))
        message.reply({ embeds: [embed.setDescription(`${author} başarıyla **${sebep}** sebebiyle afk moduna giriş yaptınız.`)] }).catch((err) => console.log(err), client.ytick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));

let data = db.get(`kmtlog.${message.guild.id}`);
client.channels.cache.get(config.logs.komutlog).send({ embeds: [embed.setDescription(` 

<@${data.mesajyazan}> İsimli Üye \`(${moment(Date.now()).format("LLL")})\`  Tarihinde <#${data.kanal}> Kanalında Komut Kullandı : **${data.mesaj}**`)] });
    }
}