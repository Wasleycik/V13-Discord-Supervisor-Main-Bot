const Discord = require("discord.js")
const config = require("../../../config.json");
const db = require("quick.db"); 
const moment = require("moment");
moment.locale("tr");

module.exports = {
    name: 'sil',
    aliases: ["sil", "temizle"],
    execute: async (client, message, args, embed, author, channel, guild) => {
  if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply({content: "**Yetersiz yetki! gereken=>mesajları sil**" }).catch(e => {})

  const sayi = args[0]

  if (!sayi) {
    return message.reply({content: "En Az `1 - 100` Arasında Bir Tam Sayı Değeri Girmelisiniz." }).catch(e => {})
  }

  if(isNaN(sayi)) return message.reply({content: "Bir Sayı Değeri Girmelisiniz." }).catch(e => {})
  if (sayi > 101) return message.reply({content: "En Az `1 - 100` Arasında Bir Tam Sayı Değeri Girmelisiniz." }).catch(e => {})


  await message.channel.messages.fetch({limit: sayi}).then(messages => {
    message.channel.bulkDelete(messages).catch(e => {})
});
  
setTimeout(() => {
    message.channel.send({content: `<@${message.author.id}> ${sayi} Adet Mesaj Başarı İle Uzaya Fırlatıldı. :rocket:`}).then(cs => {
      setTimeout(() => {
      cs.delete().catch(e => {})
      }, 5000)
    }).catch(e => {})
  }, 2000)

let data = db.get(`kmtlog.${message.guild.id}`);
client.channels.cache.get(config.logs.komutlog).send({ embeds: [embed.setDescription(` 

<@${data.mesajyazan}> İsimli Üye \`(${moment(Date.now()).format("LLL")})\`  Tarihinde <#${data.kanal}> Kanalında Komut Kullandı : **${data.mesaj}**`)] });
}}