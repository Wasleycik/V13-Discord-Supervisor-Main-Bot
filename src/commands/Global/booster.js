const Discord = require("discord.js");
const ms = require("ms");
const config = require("../../../config.json");
const db = require("quick.db"); 
const moment = require("moment");
moment.locale("tr");


module.exports = {
  name: "zengin",
  aliases: ["booster"],
  execute: async (client, message, args, embed, author, channel, guild) => {
    if (!message.member.roles.cache.has(config.roles.boster)) return message.reply({ embeds: [embed.setDescription(`Komutu kullanmak için geçerli yetkin olmalı.`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));

if(message.channel.id !== config.channels.botkomut) return message.reply({content: `Bu komutu Sadece <#${config.channels.botkomut}> kanalında kullanmalısın.`})

    let name = args.slice(0).join(' ');
    if (!name) return message.reply({ embeds: [embed.setDescription(`Öncelikle geçerli bir kullanıcı adı giriniz!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    if (name.length > 32) message.reply({ embeds: [embed.setDescription(`Öncelikle **32** karakteri geçmeyen bir isim belirtiniz!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    guild.members.cache.get(author.id).setNickname(name).then(x => message.reply({ embeds: [embed.setDescription(`Kullanıcı adın başarıyla \`${name}\` olarak değiştirildi!`)] })).catch((err) => console.log(err), client.ytick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));

client.channels.cache.get(config.logs.isimlog).send({ embeds: [embed.setDescription(`${message.author} booster Komutunu Kullanarak İsmini Düzenledi
      
        \`Kullanıcı :\` ${message.author} - (**${message.author.id}**)
        \`Yeni İsmi :\` ${name}   
        \`Değiştirilme Tarihi :\` ${moment(Date.now()).format("LLL")}`)] });

let data = db.get(`kmtlog.${message.guild.id}`);
client.channels.cache.get(config.logs.komutlog).send({ embeds: [embed.setDescription(` 

<@${data.mesajyazan}> İsimli Üye \`(${moment(Date.now()).format("LLL")})\`  Tarihinde <#${data.kanal}> Kanalında Komut Kullandı : **${data.mesaj}**`)] });
  }
}