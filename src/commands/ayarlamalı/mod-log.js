const Discord = require('discord.js')
const db = require("quick.db")
const config = require("../../../config.json");

module.exports = {
    name: "log",
    aliases: ["mod-log","modlog"],
    execute: async (client, message, args, embed, author, channel, guild) => {
if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.Guild.GuildOwnerRole)) return message.reply({ embeds: [embed.setDescription(`Komutu kullanmak için geçerli yetkin olmalı.`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
if(!args[0]) return message.reply({content: "!log ayarla #kanal veya !log sıfırla Yazmalısın!" })

  if(args[0] === "ayarla"){
  let channel = message.mentions.channels.first()
    if (!channel) {
        message.channel.send({content: ':x: | Kullanım: `!log ayarla #kanal`' })
}
    
   
    message.channel.send({content: `Mod Log Açıldı |** Log Kanalı ${channel} Olarak Ayarlandı.** ` })
await db.set('kkk_'+message.guild.id, channel.id)
}
if(args[0] === "sıfırla"){
message.channel.send({content: 'log kanalı sıfırlandı!' })
await db.delete('kkk_'+message.guild.id)
}
}
}