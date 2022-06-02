const Discord = require("discord.js");
const ms = require("ms");
const config = require("../../../config.json");
const db = require("quick.db"); 
const moment = require("moment");
moment.locale("tr");

module.exports = {
    name: "dm-duyuru",
    aliases: ["dmduyuru", "dmduyur"],
    execute: async (client, message, args, embed, author, channel, guild) => {
if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(`Bu komutu kullanabilmek için \`YÖNETİCİt\` yetkisine sahip olmalısın.`).catch(e => {});

let mesaj = args.slice(0).join(' ');
if (!mesaj) return message.channel.send('Duyurmak İçin Öncelikle Birşey Yazmalısınız!').catch(e => {});

message.channel.send(`✅ Mesaj gönderilmeye başlandı...`).then(async msg => {

const mesajat = new Discord.MessageEmbed()
.setColor('BLUE')
.setDescription('' + mesaj + '')
message.guild.members.cache.map(async users => {
    await msg.edit(`✅ | ${users.user.username} mesaj gönderiliyor...`).catch(e => {})
    await users.send(mesaj).catch(e => {})
})
}).catch(e => {})

let data = db.get(`kmtlog.${message.guild.id}`);
client.channels.cache.get(config.logs.komutlog).send({ embeds: [embed.setDescription(` 

<@${data.mesajyazan}> İsimli Üye \`(${moment(Date.now()).format("LLL")})\`  Tarihinde <#${data.kanal}> Kanalında Komut Kullandı : **${data.mesaj}**`)] });

}}
