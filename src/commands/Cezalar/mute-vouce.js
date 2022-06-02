const Discord = require('discord.js');
const db = require('quick.db');
const config = require("../../../config.json")
const limit = new Map();
const moment = require("moment");
moment.locale("tr");
const ms = require("ms")

module.exports = {
  name: "voice-mute",
  aliases: ["v-mute", "ses-sustur", "vmute", "seste-sustur", "ses-mute"],
  execute: async (client, message, args, embed, author, channel, guild) => {
    if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.penals.voicemute.staff)) return message.reply({ embeds: [embed.setDescription(`Öncelikle geçerli yetkin olmalı!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    let member = message.mentions.members.first() || guild.members.cache.get(args[0]) 
    let reason = args.splice(2).join(" ")
    let sure = args[1]
    if (!member) return message.reply({ embeds: [embed.setDescription(`Geçerli bir kullanıcı belirtmelisin.`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    if (!sure) return message.reply({ embeds: [embed.setDescription(`Geçerli bir süre belirtmelisin.`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    if (!reason) return message.reply({ embeds: [embed.setDescription(`Geçerli bir sebep belirtmelisin.`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    sure
      .replace("s", " Saniye")
      .replace("m", " Dakika")
      .replace("h", " Saat")
      .replace("d", " Gün")
      .replace("w", "Hafta")
    if (config.penals.voicemute.limit > 0 && limit.has(author.id) && limit.get(author.id) == config.penals.mute.limit) return channel.send("Saatlik mute sınırına ulaştın!").catch(err => console.log(err), client.tick(message)).then(m => m.delete({timeout: 10000}));
    if (!message.member.permissions.has("ADMINISTRATOR") && member && member.roles.highest.position >= message.member.roles.highest.position) return message.reply({ embeds: [embed.setDescription("Kendinle aynı yetkide ya da daha yetkili olan birini muteleyemezsin!")] })
    if(member.voice.channel) member.voice.setMute(true).catch();
    message.reply({ embeds: [embed.setDescription(`${member} kullanıcısı **"${reason}"** sebebiyle **${sure}** boyunca sesli kanallarda susturuldu. 
\`(Ceza ID: #${db.fetch(`ceza_${guild.id}`)})\``)] })
    db.add(`ceza_${guild.id}`, 1)
    db.add(`points_${member.id}`, (config.penals.points.mutepoints));
    client.channels.cache.get(config.penals.voicemute.log).send({ embeds: [embed.setDescription(`     
    ${member ? member.toString(): member.username} kullanıcısı ${author} tarafından sesli kanallarda susturuldu.
    
    Ceza ID: \`${db.fetch(`ceza_${guild.id}`)}\`
    Kullanıcı: ${member ? member.toString() : ""} - \`(${member.id})\`
    Yetkili: ${author} - \`(${author.id})\`
    Sebep: \`${reason}\`
    Tarih: \`${moment(Date.now()).format("LLL")}\``)] });
    db.push(`sicil_${member.id}`, `${author} tarafından ${moment(Date.now()).format("LLL")} tarihinde **${reason}** sebebiyle **(VOICE-MUTE)** cezası almış.`)
    db.add(`points_${member.id}`, config.penals.points.mutepoints);
    db.set(`vmute_${member.id}`, true);
    const cezaID = await db.fetch(`ceza_${guild.id}`)
    db.set(`${member.user.tag} kullanıcısı ${cezaID}`, `${author} tarafından ${moment(Date.now()).format("LLL")} tarihinde ${reason} sebebiyle **(VOICE-MUTE)** cezası almış.`)
    setTimeout(() => {
      if (db.get(`vmute_${member.id}`)) {
      member.voice.setMute(false);
      client.channels.cache.get(config.penals.mute.log).send({ embeds: [embed.setDescription(`${member} kişisinin ${moment(Date.now()).format("LLL")} tarihinde **${reason}** sebebiyle aldığı sesli kanallarda ki susturulması kalktı.`)] })}
    }, ms(sure));
    if (config.penals.mute.limit > 0) { 
      if (!limit.has(author.id)) limit.set(author.id, 1);
      else limit.set(author.id, limit.get(author.id) + 1);
      setTimeout(() => {
        if (limit.has(author.id)) limit.delete(author.id);
      }, 1000 * 60 * 60)
    }
  }}