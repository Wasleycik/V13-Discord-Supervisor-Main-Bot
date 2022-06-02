const { MessageEmbed } = require("discord.js");
const config = require("../../../config.json");
const db = require("quick.db"); 
const moment = require("moment");
moment.locale("tr");

module.exports = {
    name: 'say',
    aliases: ["sayy", "sayı"],
    execute: async (client, message, args, embed, author, channel, guild) => {
          if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.registration.staff)) return message.reply({ embeds: [embed.setDescription(`Komutu kullanmak için geçerli yetkin olmalı.`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        let aktif = message.guild.members.cache.filter(member => member.presence && (member.presence.status != "offline")).size
        let uye = message.guild.memberCount
        var tag = message.guild.members.cache.filter(u => u.user.username.includes(config.registration.GuilDTag)).size;
        let sesli = message.guild.members.cache.filter(x => x.voice.channel).size
        let boost = message.guild.premiumSubscriptionCount;
        let topses = message.guild.members.cache.filter(s => s.voice.channel);
        var bot = topses.filter(s => s.user.bot);
        let role =  guild.roles.cache.find(rol => rol.id === config.registration.staff)
        let boostlevel = message.guild.premiumTier;

        message.reply({ embeds: [embed.setDescription(`

    ◾️ Sunucumuzda toplam \`${uye} (${aktif} aktif)\` kullanıcı bulunuyor.
    ◾️ Seste \`${sesli} (+${bot.size} Bot)\` kullanıcı bulunuyor.
    ◾️ Sunucunuzda Toplam \`${tag}\` Taglı Ve \`${role.members.size}\` Yetkili Üye Bulunuyor 
    ◾️ Sunucuya Toplamda \`${boost}\` Boost Basılmış \`(${boostlevel}. seviye)\`
    `)] });

let data = db.get(`kmtlog.${message.guild.id}`);
client.channels.cache.get(config.logs.komutlog).send({ embeds: [embed.setDescription(` 

<@${data.mesajyazan}> İsimli Üye \`(${moment(Date.now()).format("LLL")})\`  Tarihinde <#${data.kanal}> Kanalında Komut Kullandı : **${data.mesaj}**`)] });
      
    }
}