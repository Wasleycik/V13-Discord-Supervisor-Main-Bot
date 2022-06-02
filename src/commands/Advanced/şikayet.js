const Discord = require("discord.js")
const config = require("../../../config.json");
const db = require("quick.db"); 
const moment = require("moment");
moment.locale("tr");

module.exports = {
    name: "şikayet",
    aliases: ["şikayetet"],
    execute: async (client, message, args, author, channel, guild) => {
    let type = args.slice(0).join(' ');
    if (type.length < 1) return message.reply(
{embeds:[new Discord.MessageEmbed()
.setColor("BLUE")
.setDescription('Kullanım: .şikayet Şikayetin')]});
const embed = new Discord.MessageEmbed()
.setColor('RANDOM')
.setDescription('Şikayetiniz Bildirildi!')
message.reply({embeds:[embed]})
const embed2 = new Discord.MessageEmbed()
.setColor("RED")
.setDescription(`**${message.author.tag}** \`${message.author.id}\` adlı kullanıcı Bir ikayette Bulundu`)
.addField(`**Kulanıcı Bilgileri**`, `Kullanıcı : ${message.author} (\`${message.author.username}#${message.author.discriminator} ${message.author.id}\`)\n Şikayette Bulunduğu Zaman : \`${moment(Date.now()).format("LLL")}\` `)
.setThumbnail(message.author.avatarURL)
.addField("Şikayeti", type)
client.channels.cache.get(config.logs.şikayetlog).send({embeds:[embed2]});


let data = db.get(`kmtlog.${message.guild.id}`);
client.channels.cache.get(config.logs.komutlog).send({ embeds: [embed.setDescription(` 

<@${data.mesajyazan}> İsimli Üye \`(${moment(Date.now()).format("LLL")})\`  Tarihinde <#${data.kanal}> Kanalında Komut Kullandı : **${data.mesaj}**`)] });

}}