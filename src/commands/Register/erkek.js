const Discord = require("discord.js");
const db = require("quick.db");
const config = require("../../../config.json")
const moment = require("moment");
moment.locale("tr");

module.exports = {
    name: "erkek",
    aliases: ["e", "boy", "man"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        var member = message.mentions.users.first() || guild.members.cache.get(args[0]);
        const name = args[1]
        const age = args[2]
        
        let erkek = db.get(`erkek_${author.id}`) || 0;
        let kadın = db.get(`kadın_${author.id}`) || 0;
        let toplam = db.get(`toplam_${author.id}`) || 0;

       if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.registration.staff)) return message.reply({ embeds: [embed.setDescription(`Komutu kullanmak için geçerli yetkin olmalı.`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        if (!member) return message.reply({ embeds: [embed.setDescription("Geçerli bir kullanıcı belirtmelisin!")] });
        if (!name) return message.reply({ embeds: [embed.setDescription("Geçerli bir isim belirtmelisin!")] });
        if (!age) return message.reply({ embeds: [embed.setDescription("Geçerli bir yaş belirtmelisin!")] });
        if (isNaN(age)) return message.reply({ embeds: [embed.setDescription("Yaş geçerli rakamlardan oluşsun!")] });
        if (age < config.registration.minage) return message.reply({ embeds: [embed.setDescription("Kullanıcı için belirtilen yaş minimum yaştan küçük!")] });
        if (config.registration.purchase) {
            if (!member.username.includes(config.registration.GuilDTag) && !member.roles.cache.has(config.roles.viprole && config.roles.boosterrole && config.roles.musiciansrole && config.roles.designerrole && config.roles.team)) {
                return message.reply({ embeds: [embed.setDescription(`Taglı alımdayız! (${config.registration.TagSymbol})`)] });
            }
        }
        await guild.members.cache.get(member.id).setNickname(`${config.registration.TagSymbol} ${name} ${config.registration.symbol} ${age}`);
        db.add(`erkek_${author.id}`, 1)
        db.add(`toplam_${author.id}`, 1)
              const names = db.get(`isimler_${member.id}`)
        db.push(`isimler_${member.id}`, ` \`${config.registration.TagSymbol} ${name} ${config.registration.symbol} ${age}\` (<@&${config.registration.oneman}>)`);
        db.push(`kke_${member.id}`, `${author} \`${moment(Date.now()).format("LLL")}\` (<@&${config.registration.oneman}>)`)
        await guild.members.cache.get(member.id).roles.add(config.registration.man);
        await guild.members.cache.get(member.id).roles.remove(config.registration.unregistered)
        if (!names) {
            message.reply({ embeds: [embed.setDescription(`${member} İsimli Kullanıcı Başarıyla Kayıt Oldu\n  Kullanıcının ismi \`${name} ${config.registration.symbol} ${age}\` olarak değiştirildi\n Kullanıcıya <@&${config.registration.oneman}> rolü verilerek kayıt edildi!\n\n <@${message.author.id}> Tarafından Kaydedildi Toplamda **${toplam}** Kaydını Gerçekleştirdi`)] });
        } else {
            message.reply({ embeds: [embed.setDescription(`Kullanıcı başarıyla <@&${config.registration.oneman}> olarak kayıt edildi!\n\n Kullanıcının toplamda " ${names.length} " isim kayıtı görüntülendi.\n${names.map((data) => `${data}`).join("\n")}`)] });
        }

        client.channels.cache.get(config.channels.chat).send(`Merhaba ${member} Aramıza Hoşgeldin İyi Eğlenceler Dilerim`);




        client.channels.cache.get(config.logs.kayıtlog).send({ embeds: [embed.setDescription(`${member} İsimli Kullanıcı Başarıyla Kayıt Edildi
      
        \`Kayıt Olan:\` ${member} - (**${member.id}**)
        \`Kayıt Eden Yetkili:\` ${message.author} - (**${message.author.id}**)
        \`İsmi Ve Yaşı:\` ${name} ${config.registration.symbol} ${age}
        \`Verilen Roller :\` <@&${config.registration.oneman}>     
        \`Kayıt Edilme Tarihi:\` ${moment(Date.now()).format("LLL")}
        \`Yetkilinin Toplam Kayıtları:\` Erkek : **${erkek}** Kadın : **${kadın}** Toplam : **${toplam}**


`)
        
        

] });
    }
}
