const Discord = require("discord.js");
const ms = require("ms");
const config = require("../../../config.json");
const db = require("quick.db"); 
const moment = require("moment");
moment.locale("tr");

module.exports = {
    name: "yeniden-başlat",
    aliases: ["reboot"],
    execute: async (client, message, args, author, channel, guild) => {

if(message.author.id !== "598974473374400512") return message.channel.send("Sahibim Değilsin Bu Komutu Kullanamazsın!")
const embed = new Discord.MessageEmbed()
.setTitle('Reboot')
.setDescription("Şu an "+ client.user.username + " bot'u yeniden başlatmak üzeresin.")
.addField('Şu anki Ping Değeri:', '**'+client.ws.ping+'** ms!')
.addField('__SEÇENEKLER__', '**devam**')
.setFooter({ text: client.user.username, iconURL: client.user.avatarURL })
.setTimestamp()
.setColor('RED')
message.channel.send({ embeds: [embed] })

.then(() => {
  const filter = m => m.content.includes('devam');
  message.channel.awaitMessages({ filter: filter, max: 1 })

  .then((collected) => {
      message.channel.send("**Bot yeniden başlatılıyor...**").then(message => {
      console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Bot yeniden başlatılıyor...`)
      process.exit(1);
    }).catch(console.error)
    })
    .catch(() => {
      message.channel.send('Yeniden başlatma işlemi iptal edildi.');

let data = db.get(`kmtlog.${message.guild.id}`);
client.channels.cache.get(config.logs.komutlog).send({ embeds: [embed.setDescription(` 

<@${data.mesajyazan}> İsimli Üye \`(${moment(Date.now()).format("LLL")})\`  Tarihinde <#${data.kanal}> Kanalında Komut Kullandı : **${data.mesaj}**`)] });
    });
});
}}