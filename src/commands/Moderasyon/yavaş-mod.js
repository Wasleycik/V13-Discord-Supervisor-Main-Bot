const { MessageEmbed } = require("discord.js") 
const ms = require("ms")
const Discord = require("discord.js")
const config = require("../../../config.json");
const db = require("quick.db"); 
const moment = require("moment");
moment.locale("tr");

module.exports = {
    name: "slowmode",
    aliases: ["yavaşmod"],
    execute: async (client, message, args, embed, author, channel, guild) => {
    const prefix = config.bot.prefix;
     if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply({ embeds: [embed.setDescription(`Komutu kullanmak için geçerli yetkin olmalı.`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    if (!args[0]) {
        const slowmodeError2 = new MessageEmbed()
            .setDescription(`**Lütfen Geçerli Bir Zaman Yaz!**\n\nZaman Kavramları - h(saat), m(dakika), s(saniye)\n(Örnek -  ${prefix}slowmode 5s)`)
            .setColor('RED')
        return message.reply({ embeds: [slowmodeError2] })
    }
    const currentSlowmode = message.channel.rateLimitPerUser
    const reason = args[1] ? args.slice(1).join(" ") : 'Sebep Yok!'

    if (args[0] === 'kapat') {
        if (currentSlowmode === 0) {
            const slowmodeOfferror = new MessageEmbed()
                .setDescription(`Yavaş Mod Zaten Kapalı!`)
                .setColor('RED')
            return message.reply({ embeds: [slowmodeOfferror] })
        }
        message.channel.setRateLimitPerUser(0, reason)
        const slowmodeOff = new MessageEmbed()
            .setDescription(`Yavaş Mod Kapatıldı!`)
            .setColor('BLUE')

        return message.reply({embeds: [slowmodeOff]})
    }

    const time = ms(args[0]) / 1000
    const slowmodeError3 = new MessageEmbed()
        .setDescription(`Lütfen Geçerli Bir Zaman Yaz!\n\nZaman Kavramları - h(saat), m(dakika), s(saniye)\n(Örnek -  ${prefix}slowmode 5s)`)
        .setColor('RED')
    if (isNaN(time)) {
        return message.reply({embeds: [slowmodeError3]})
    }

    if (time > 21600000) {
        const slowmodeError4 = new MessageEmbed()
            .setDescription(`Yavaş Mod En Fazla 6 Saat Olabilir!`)
            .setColor('RED')

        return message.reply({embeds: [slowmodeError4]})
    }

    if (currentSlowmode === time) {
        const slowmodeError5 = new MessageEmbed()
            .setDescription(`Yavaş Mod Zaten Ayarlanmış |  ${args[0]}`)
            .setColor('RED')
        return message.reply({embeds: [slowmodeError5]})
    }

    let slowmode = await message.channel.setRateLimitPerUser(time, reason)
    let afterSlowmode = message.channel.rateLimitPerUser
    if (afterSlowmode > 0) {
        const embed = new MessageEmbed()
            .setTitle(`Yavaş Mod Başarılı Bir Şekilde Açıldı!`)
            .addField(`Yavaş Mod Süresi`, args[0])
            .addField(`Sebep`, reason)
            .setColor('RED')

        return message.reply({ embeds: [embed] })
    } else if (afterSlowmode === 0) {
        return message.reply({ embeds: [slowmodeError3] })
    }

let data = db.get(`kmtlog.${message.guild.id}`);
client.channels.cache.get(config.logs.komutlog).send({ embeds: [embed.setDescription(` 

<@${data.mesajyazan}> İsimli Üye \`(${moment(Date.now()).format("LLL")})\`  Tarihinde <#${data.kanal}> Kanalında Komut Kullandı : **${data.mesaj}**`)] });
}}