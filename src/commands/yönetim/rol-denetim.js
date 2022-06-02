const Discord = require("discord.js")
const config = require("../../../config.json");
const db = require("quick.db"); 
const moment = require("moment");
moment.locale("tr");

module.exports = {
    name: "rol-denetim",
    aliases: ["roldenetim", "roldenetle"],

    execute: async (client, message, args, embed, author, channel, guild) => {
       
        if (!message.member.permissions.has("VIEW_AUDIT_LOG")) return;
        let roles = args.length > 0 ? message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) : message.guild.roles.cache.find(x => x.id == config.yetki.botcommand)
            let offlineMembers = message.guild.members.cache.filter(x => {
                return x.roles.cache.has(roles.id) && !x.voice.channel && (x.presence && x.presence.status == "offline")
            })
            let voiceMembers = message.guild.members.cache.filter(x => {
                return x.roles.cache.has(roles.id) && x.voice.channel
            })
            let notVoiceMembers = message.guild.members.cache.filter(x => {
                return x.roles.cache.has(roles.id) && !x.voice.channel
            })
            message.channel.send("```Roldeki Offline Kullanıcılar("+ offlineMembers.size +"):\n```" + offlineMembers.map(x => "<@" + x.id + ">").join(",") + "")
            message.channel.send("```Roldeki Seste Olan Kullanıcılar("+ voiceMembers.size +"):\n```" + voiceMembers.map(x => "<@" + x.id + ">").join(",") + "")
            message.channel.send("```Roldeki Seste Olmayan Kullanıcılar("+ notVoiceMembers.size +"):\n```" + notVoiceMembers.map(x => "<@" + x.id + ">").join(",") + "")

let data = db.get(`kmtlog.${message.guild.id}`);
client.channels.cache.get(config.logs.komutlog).send({ embeds: [embed.setDescription(` 

<@${data.mesajyazan}> İsimli Üye \`(${moment(Date.now()).format("LLL")})\`  Tarihinde <#${data.kanal}> Kanalında Komut Kullandı : **${data.mesaj}**`)] });
        }
}
