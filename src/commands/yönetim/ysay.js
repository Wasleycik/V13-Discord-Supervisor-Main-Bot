const Discord = require("discord.js")
const config = require("../../../config.json");
const db = require("quick.db"); 
const moment = require("moment");
moment.locale("tr");

module.exports = {
  name: "yetkili-say",
  aliases: ["yetkilisay","ysay","ysay"],
  execute: async (client, message, args, embed, author, channel, guild) => {

     if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.Guild.GuildOwnerRole) && !message.member.permissions.has(8)) return message.reply({ embeds: [embed.setDescription(`Komutu kullanmak için geçerli yetkin olmalı.`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        const content = args[0]; 

        let sesteolmayan = message.guild.members.cache.filter(s => s.roles.cache.has(config.registration.staff)).filter(s => !s.voice.channel).map(s => s).join('\n')
        let sesteolan = message.guild.members.cache.filter(s => s.roles.cache.has(config.registration.staff)).filter(s => s.voice.channel).map(s => s).join('\n')
        
         message.reply(`Seste Olan Yetkililer; \n${sesteolan || "Kimse yok"}\n\nSeste olmayan Yetkililer;\n${sesteolmayan || "Kimse yok"}`)
         message.channel.send(`**Yetkili Arkadaşlar Chatta Aktiflik Sağlayıp İnvite Ve Partnere Yüklenirmisiniz Rica Etsem\n İşiniz Yoksa Seslerde Afk Bırakırmısınız \n Sunucuda Yaptığınız Her Şey Kayıtadır Yetki Yükseltiminde Bunlara Bakılarak Yapılmaktadır Yetkinizin Yükselmesini Ve Aile Ortamımızı Koruya Bilmek İçin Size Verdiğimiz  Görevler Vb Herşeyi Yapabilirmisiniz \n\n Seviliyorsunuz <3 **`)

let data = db.get(`kmtlog.${message.guild.id}`);
client.channels.cache.get(config.logs.komutlog).send({ embeds: [embed.setDescription(` 

<@${data.mesajyazan}> İsimli Üye \`(${moment(Date.now()).format("LLL")})\`  Tarihinde <#${data.kanal}> Kanalında Komut Kullandı : **${data.mesaj}**`)] });
           
    }

}