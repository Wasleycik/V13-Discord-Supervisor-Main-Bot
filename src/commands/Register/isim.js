const config = require("../../../config.json")
const db = require("quick.db");
const moment = require("moment");
moment.locale("tr");

module.exports = {
    name: "isim",
    aliases: ["i", "nickname"],

    execute: async (client, message, args, embed, author, channel, guild) => {
        var member = message.mentions.users.first() || guild.members.cache.get(args[0]);
        var name = args[1]
        const age = args[2]
       if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.registration.staff)) return message.reply({ embeds: [embed.setDescription(`Komutu kullanmak için geçerli yetkin olmalı.`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        if (!member) return message.reply({ embeds: [embed.setDescription("Öncelikle geçerli bir kullanıcı belirtmelisin!")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        if (!name) return message.reply({ embeds: [embed.setDescription("Öncelikle geçerli bir isim belirtmelisin!")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        if (!age) return message.reply({ embeds: [embed.setDescription("Geçerli bir yaş belirtmelisin!")] });
        if (isNaN(age)) return message.reply({ embeds: [embed.setDescription("Yaş geçerli rakamlardan oluşsun!")] });
        if (age < config.registration.minage) return message.reply({ embeds: [embed.setDescription("Kullanıcı için belirtilen yaş minimum yaştan küçük!")] });
        db.push(`isimler_${member.id}`, ` \`${config.registration.TagSymbol} ${name} ${config.registration.symbol} ${age}\` İsim Değiştirme`);
        await guild.members.cache.get(member.id).setNickname(`${config.registration.TagSymbol} ${name} ${config.registration.symbol} ${age}`);
        message.reply({ embeds: [embed.setDescription(`Kullanıcısının ismi \`${config.registration.TagSymbol} ${name} ${config.registration.symbol} ${age}\` olarak değiştirildi!`)] }).catch((err) => console.log(err), client.ytick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));

 client.channels.cache.get(config.logs.isimlog).send({ embeds: [embed.setDescription(`${member} Kullanıcısının İsmi ${message.author} tarafından Düzenlendi
      
        \`İsmi Düzenlenen Kullanıcı:\` ${member} - (**${member.id}**)
        \`Düzenleyen Yetkili:\` ${message.author} - (**${message.author.id}**)
        \`Yeni İsmi :\` ${config.registration.TagSymbol} ${name} ${config.registration.symbol} ${age}   
        \`Değiştirilme Tarihi :\` ${moment(Date.now()).format("LLL")}`)] });

    }
}
