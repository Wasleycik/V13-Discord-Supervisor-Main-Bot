const config = require("../../../config.json");
const db = require("quick.db");
const moment = require("moment");
moment.locale("tr");
module.exports = {
    name: "cihaz-bilgi",
    aliases: ["cihaz", "bg"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        
        var member = message.mentions.members.first() || guild.members.cache.get(args[0]) || message.member;
    let Cihaz = {
      web: 'İnternet Tarayıcısı',
      desktop: 'Bilgisayar (App)',
      mobile: 'Mobil'
    }
    let clientStatus;
    if (member.presence && member.presence.status !== 'offline') { clientStatus = `${Cihaz[Object.keys(member.presence.clientStatus)[0]]}` } else { clientStatus = 'Çevrimdışı/Görünmez' }
        message.reply({ embeds: [embed.setDescription(`${member.toString()} kullanıcısının bağlandığı cihaz: \`${clientStatus}\`
`)] });

  let data = db.get(`kmtlog.${message.guild.id}`);
client.channels.cache.get(config.logs.komutlog).send({ embeds: [embed.setDescription(` 

<@${data.mesajyazan}> İsimli Üye \`(${moment(Date.now()).format("LLL")})\`  Tarihinde <#${data.kanal}> Kanalında Komut Kullandı : **${data.mesaj}**`)] });
    }
}