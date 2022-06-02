const db = require("quick.db");
const config = require("../../../config.json");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
moment.locale("tr");

module.exports = {
    name: "sicil",
    aliases: ["sicil"],
    execute: async (client, message, args, embed, author, channel, guild) => {
       if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.penals.warn.staff) && !message.member.roles.cache.has(config.yetki.botcommand)) return message.reply({ embeds: [embed.setDescription(`Komutu kullanmak için geçerli yetkin olmalı.`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.reply({ embeds: [embed.setDescription("Öncelikle geçerli bir kullanıcı belirtmelisin.")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        const warns = await db.fetch(`warns_${member.id}`);
        const sicil = await db.fetch(`sicil_${member.id}`);
        const points = db.fetch(`points_${member.id}`) || 0
        if (!warns) return message.reply({ embeds: [embed.setDescription("Bu kullanıcının veri tabanında daha önceden Aldığı Cezaların verisi bulunmamakta.")] }).catch((err) => console.log(err), client.tick(message))
        message.reply({ embeds: [embed.setDescription(`\`Kullanıcının Almış Olduğu Tüm Cezaları\` \n\n  ${sicil.map((data) => `${data}`).join("\n")}`)] }).catch((err) => console.log(err), client.tick(message) )
    }
}