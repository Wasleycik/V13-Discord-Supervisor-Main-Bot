const Discord = require("discord.js")
const config = require("../../../config.json");
const db = require("quick.db"); 
const moment = require("moment");
moment.locale("tr");
const limit = new Map();

module.exports = {
    name: "yetkili-yap",
    aliases: ["yetki-ver", "yt"],

    execute: async (client, message, args, embed, author, channel, guild) => {
        if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.yetki.yetkilialim) && !message.member.roles.cache.has(config.yetki.yetkilialim) && !message.member.permissions.has(8)) return message.reply({ embeds: [embed.setDescription("Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        var member = message.mentions.users.first() || guild.members.cache.get(args[0]);
        let total = db.get(`subs_${author.id}`) || 0;
        if (!member) return message.reply({ embeds: [embed.setDescription("Öncelikle geçerli bir kullanıcı belirtmelisin!")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        if (member.id === author.id) return message.reply({ embeds: [embed.setDescription("Kendine yetkili rolleri veremezsin!")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        
        guild.members.cache.get(member.id).roles.add(config.registration.staff);
        guild.members.cache.get(member.id).roles.add(config.yetki.enaltytrol);
         guild.members.cache.get(member.id).roles.add(config.yetki.yetki7);
        
        message.reply({ embeds: [embed.setDescription(`${member} kullanıcısına  <@&${config.registration.staff}> <@&${config.yetki.yetki7}> ve <@&${config.yetki.enaltytrol}> rolleri verildi.`)] });
        if (config.bot.dmMessages) member.send(`**${message.guild.name}** sunucumuzda başarıyla, **${message.author.tag}** yöneticisi tarafından yetkili rollerin verildi iyi eğlenceler!`).catch(() => {});
        
        client.channels.cache.get(config.channels.chat).send({ content: `${member} kullanıcısı sunucumuzda yetkili oldu, aramıza hoş geldin.` }).then((e) => setTimeout(() => { e.delete(); }, 10000));
        client.channels.cache.get(config.logs.rollog).send({ content: `${member} - \`(${member.id})\` kullanıcısına \`(${message.author.id})\` tarafından **YETKİLİ** rolleri verildi.` });

let data = db.get(`kmtlog.${message.guild.id}`);
client.channels.cache.get(config.logs.komutlog).send({ embeds: [embed.setDescription(` 

<@${data.mesajyazan}> İsimli Üye \`(${moment(Date.now()).format("LLL")})\`  Tarihinde <#${data.kanal}> Kanalında Komut Kullandı : **${data.mesaj}**`)] });
    }
}
