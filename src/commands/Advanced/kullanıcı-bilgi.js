const config = require("../../../config.json");
const db = require("quick.db");
const moment = require("moment");
moment.locale("tr");
module.exports = {
    name: "kullanıcı-bilgi",
    aliases: ["kullanıcıbilgi", "bilgi", "kb", "profil"],
    execute: async (client, message, args, embed, author, channel, guild) => {

if(message.channel.id !== config.channels.botkomut) return message.reply({content: `Bu komutu Sadece <#${config.channels.botkomut}> kanalında kullanmalısın.`})
        
        var member = message.mentions.members.first() || guild.members.cache.get(args[0]) || message.member;
    let Cihaz = {
      web: 'İnternet Tarayıcısı',
      desktop: 'Bilgisayar (App)',
      mobile: 'Mobil'
    }
    let clientStatus;
    if (member.presence && member.presence.status !== 'offline') { clientStatus = `${Cihaz[Object.keys(member.presence.clientStatus)[0]]}` } else { clientStatus = 'Çevrimdışı/Görünmez' }
        message.reply({ embeds: [embed.setDescription(`**Üye Bilgileri**
        
Kullanıcı: ${member.toString()} - (\`${member.id}\`)
Hesap Kurulum Tarihi: \`${moment(member.user.createdAt).format("LLL")}\`
Bağlandığı Cihaz: \`${clientStatus}\`
**Sunucu Bilgileri**
Sunucuya Katılma Tarihi: \`${moment(member.joinedAt).format("LLL")}\`
Katılım Sırası: \`${(message.guild.members.cache.filter(a => a.joinedTimestamp <= member.joinedTimestamp).size).toLocaleString()}/${(message.guild.memberCount).toLocaleString()}\`
En Yüksek Rolü: (${member.roles.highest})
`)] });

 let data = db.get(`kmtlog.${message.guild.id}`);
client.channels.cache.get(config.logs.komutlog).send({ embeds: [embed.setDescription(` 

<@${data.mesajyazan}> İsimli Üye \`(${moment(Date.now()).format("LLL")})\`  Tarihinde <#${data.kanal}> Kanalında Komut Kullandı : **${data.mesaj}**`)] });

    }
}