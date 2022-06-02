const { MessageEmbed } = require("discord.js")
const { prefix } = require("../../../config.json")
const config = require("../../../config.json");
const ms = require("ms");
const db = require("quick.db"); 
const moment = require("moment");
moment.locale("tr");

module.exports = {
    name: 'banner',
    aliases: ["banner"],
  
    execute: async (client, message, args, embed, author, channel, guild) => {

if(message.channel.id !== config.channels.botkomut) return message.reply({content: `Bu komutu Sadece <#${config.channels.botkomut}> kanalında kullanmalısın.`})
    if(!args[0]) args[0] = message.author.id
    let member = args[0].toString().replace(/[+<+@+!+>]/g, "")
    if(isNaN(member)) return message.reply({content: `**Doğru kullanım:** \`${prefix}banner @etiket/id\``}).then(msg => {setTimeout(() => {msg.delete()}, 5000)})
    client.users.fetch(member, {cache: false, force: true}).then(x => {
        if(x.banner !== null) {
            const embed = new MessageEmbed()
            .setAuthor({name: x.tag, iconURL: x.avatarURL({dynamic: true})})
            .setTitle("Afiş link!")
            .setURL(x.bannerURL({dynamic: true, size: 4096}))
            .setColor(x.hexAccentColor)
            .setImage(x.bannerURL({dynamic: true, size: 4096}))
            .setFooter({text: `${message.author.tag} tarafından istendi!`, iconURL: message.author.avatarURL({dynamic: true})})
            .setTimestamp()
            message.reply({embeds: [embed]})
        } else if(x.accentColor !== null) {
            const embed = new MessageEmbed()
            .setAuthor({name: x.tag, iconURL: x.avatarURL({dynamic: true})})
            .setColor(x.hexAccentColor)
            .setDescription(`<@!${x.id}>**(${x.tag})** adlı kullanıcının afişi yok ama afiş rengi vardır.\nAfiş Rengi: \`${x.hexAccentColor}\``)
            .setFooter({text: `${message.author.tag} tarafından istendi!`, iconURL: message.author.avatarURL({dynamic: true})})
            .setTimestamp()
            message.reply({embeds: [embed]})
        } else return message.reply({content: `\`${x.tag}\` adlı kullanıcının ne afişi ne de afiş rengi yoktur!`}).then(msg => {setTimeout(() => {msg.delete()}, 5000)})

let data = db.get(`kmtlog.${message.guild.id}`);
client.channels.cache.get(config.logs.komutlog).send({ embeds: [embed.setDescription(` 

<@${data.mesajyazan}> İsimli Üye \`(${moment(Date.now()).format("LLL")})\`  Tarihinde <#${data.kanal}> Kanalında Komut Kullandı : **${data.mesaj}**`)] });
    })
}}