const Discord = require("discord.js")
const config = require("../../../config.json");
const db = require("quick.db"); 
const moment = require("moment");
moment.locale("tr");

module.exports = {
  name: "yetkili-ses",
  aliases: ["yses"],
  execute: async (client, message, args, embed, author, channel, guild) => {
   if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.Guild.GuildOwnerRole) && !message.member.permissions.has(8)) return message.reply({ embeds: [embed.setDescription(`Komutu kullanmak için geçerli yetkin olmalı.`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));

      let matthe = args[0];

      let sesdedeğil = message.guild.members.cache.filter(x => x.roles.cache.has(config.registration.staff)).filter(y => !y.voice.channel && y.presence && (y.presence.status != "offline"))
      message.reply(`
        **Aktif olup seste olmayan yetkililer:**

    ${sesdedeğil.map(s => `${s} \`${s.user.tag}\``).join('\n')}`)

let data = db.get(`kmtlog.${message.guild.id}`);
client.channels.cache.get(config.logs.komutlog).send({ embeds: [embed.setDescription(` 

<@${data.mesajyazan}> İsimli Üye \`(${moment(Date.now()).format("LLL")})\`  Tarihinde <#${data.kanal}> Kanalında Komut Kullandı : **${data.mesaj}**`)] });
    
  }
}