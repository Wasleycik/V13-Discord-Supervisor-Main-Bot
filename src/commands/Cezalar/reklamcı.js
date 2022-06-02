const Discord = require("discord.js");
const db = require("quick.db");
const config = require("../../../config.json")
const limit = new Map()
const moment = require("moment")
moment.locale("tr")

module.exports = {
    name: "reklam",
    aliases: ["reklamcı"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.penals.reklam.staff) && !message.member.permissions.has(8)) return message.reply({ embeds: [embed.setDescription(`Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        let member = message.mentions.members.first() || guild.members.cache.get(args[0]);
       
        if (!member) return message.reply({ embeds: [embed.setDescription("Öncelikle reklam yapan kullanıcıyı belirtmelisin.")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        
        if (member.roles.cache.get(config.penals.reklam.roles)) return message.reply({ embeds: [embed.setDescription(`${member} kullanıcısı zaten cezalandırılmış.`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        if (!message.member.permissions.has("ADMINISTRATOR") && member && member.roles.highest.position >= message.member.roles.highest.position) return message.reply({ embeds: [embed.setDescription("Kendinle aynı yetkide ya da daha yetkili olan birini cezalandıramazsın!")] })
        db.set(`roles.${member.id}`, member.roles.cache.map(x => x.id))
        db.set(`isim.${member.id}`, member.displayName)
        member.setNickname(`[REKLAMCI] ${member.displayName}`)
        member.roles.set([config.penals.reklam.roles])

        message.reply({ embeds: [embed.setDescription(`${member} kullanıcısı ${author} tarafından "reklam" Cezası Verildi \`(Ceza ID: #${db.fetch(`ceza_${guild.id}`)})\``)] }).catch((err) => console.log(err), client.ytick(message))
        db.add(`ceza_${guild.id}`, 1)
        client.channels.cache.get(config.penals.reklam.log).send({ embeds: [embed.setDescription(`     
        ${member ? member.toString(): member.username} kullanıcısı ${author} tarafından Reklam Cezasına Çarptırıldı
        Ceza ID: \`${db.fetch(`ceza_${guild.id}`)}\`
        Kullanıcı: ${member ? member.toString() : ""} - \`(${member.id})\`
        Yetkili: ${author} - \`(${author.id})\`
        Sebep: \`Reklam Yapmak\`
        Tarih: \`${moment(Date.now()).format("LLL")}\``)] });

      const cezaID = await db.fetch(`ceza_${guild.id}`)
    db.set(`${cezaID}`, `${author} tarafından ${moment(Date.now()).format("LLL")} tarihinde reklam sebebiyle **[REKLAM]** cezası almış.`)
        if (config.penals.reklam.limit > 0) {
            if (!limit.has(message.author.id)) limit.set(message.author.id, 1);
            else limit.set(message.author.id, limit.get(message.author.id) + 1);
            setTimeout(() => {
                if (limit.has(message.author.id)) limit.delete(message.author.id);
                
            }, 1000 * 60 * 60)
        };
    }
}