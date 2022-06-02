const { Util, Permissions } = require("discord.js")
const config = require("../../../config.json")
const db = require("quick.db");
const moment = require("moment");
moment.locale("tr");

module.exports = {
    name: 'emoji-yükle',
    aliases: ["emojiyükle"],

    execute: async (client, message, args, embed, author, channel, guild) => {
     
  if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.Guild.GuildOwnerRole) && !message.member.permissions.has(8)) return message.reply({ embeds: [embed.setDescription(`Komutu kullanmak için geçerli yetkin olmalı!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));

    if(!args.length) return message.reply({content : "Bir ya da birden fazla emoji belirt!"})
    for(const rawEmoji of args) {
        const parsedEmoji = Util.parseEmoji(rawEmoji)
        if(parsedEmoji) {
            const aress = parsedEmoji.animated ? ".gif" : ".png";
            const ares = `https://cdn.discordapp.com/emojis/${parsedEmoji.id + aress}`
            message.guild.emojis.create(ares, parsedEmoji.name).then(emoji => {
                message.reply({content: `Eklendi: \`${emoji.url}\``}).then(msg => {
                  setTimeout(() => msg.delete(), 5000);
                })
            }).catch(e => {
                console.log(e)
                return message.reply({content: "Bir hata oluştu lütfen developerıma danış!"}).then(msg => {
                  setTimeout(() => msg.delete(), 5000)
                })
            })
        }
    }

  let data = db.get(`kmtlog.${message.guild.id}`);
client.channels.cache.get(config.logs.komutlog).send({ embeds: [embed.setDescription(` 

<@${data.mesajyazan}> İsimli Üye \`(${moment(Date.now()).format("LLL")})\`  Tarihinde <#${data.kanal}> Kanalında Komut Kullandı : **${data.mesaj}**`)] });

}
}