const Discord = require("discord.js");
const get = require("request")
const ms = require("ms");
const config = require("../../../config.json");
const db = require("quick.db"); 
const moment = require("moment");
moment.locale("tr");

module.exports = {
    name: "hesperos",
    aliases:  ['Hesperos', 'was', 'Wasley'],
    execute: async (client, message, args, embed, author, channel, guild) => {

if(message.channel.id !== config.channels.botkomut) return message.reply({content: `Bu komutu Sadece <#${config.channels.botkomut}> kanalında kullanmalısın.`})
let soru = args.join(' ');
if(!soru) return message.reply(' Reis Sohbet Edeceksen Birşeyler Yaz Bari :)')
let encodedsoru = encodeURI(soru)
get(`https://api.codare.fun/sor/${encodedsoru}`, async function (err, resp, body) { 
body = JSON.parse(body); 
if(err) return message.channel.send('**Hata oluştu Eror Verdim Yapma Bi Daha**')
message.channel.send(body.cevap)

let data = db.get(`kmtlog.${message.guild.id}`);
client.channels.cache.get(config.logs.komutlog).send({ embeds: [embed.setDescription(` 

<@${data.mesajyazan}> İsimli Üye \`(${moment(Date.now()).format("LLL")})\`  Tarihinde <#${data.kanal}> Kanalında Komut Kullandı : **${data.mesaj}**`)] });
    }) 
}}