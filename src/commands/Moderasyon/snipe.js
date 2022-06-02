const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const moment = require("moment")
require('moment-duration-format');
const config = require("../../../config.json");

module.exports = {
    name: "snipe",
    aliases: ["snipe"],
    execute: async (client, message, args, anan, author, channel, guild) => {
 if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.registration.staff)) return message.reply({ embeds: [embed.setDescription(`Komutu kullanmak için geçerli yetkin olmalı.`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        let embed = new MessageEmbed().setColor("#40FC00").setFooter(config.bot.BotStatus);
    let data = db.get(`snipe.${message.guild.id}`);
    if(!data) return  message.reply({ embeds: [embed.setDescription(`Sunucuda Daha Önce Mesaj Silinmemiş.`)] }).catch(e => { });
     message.reply({ embeds: [embed.setDescription(`
    ◾️ \`Yazan Kişi:\` <@${data.mesajyazan}>
    ◾️ \`Mesaj:\` **${data.mesaj}**
    ◾️ \`Kanal:\` <#${data.kanal}>
    ◾️ \`Yazılma Tarihi:\` ${moment.duration(Date.now() - data.ytarihi).format("D [gün], H [saat], m [dakika], s [saniye]")} **Önce Yazılmış**
    ◾️ \`Silinme Tarihi:\` ${moment.duration(Date.now() - data.starihi).format("D [gün], H [saat], m [dakika], s [saniye]")} **Önce Silinmiş**
    
    `)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));

let kdata = db.get(`kmtlog.${message.guild.id}`);
client.channels.cache.get(config.logs.komutlog).send({ embeds: [embed.setDescription(` 

<@${kdata.mesajyazan}> İsimli Üye \`(${moment(Date.now()).format("LLL")})\`  Tarihinde <#${kdata.kanal}> Kanalında Komut Kullandı : **${kdata.mesaj}**`)] });
        
        }
    }
        