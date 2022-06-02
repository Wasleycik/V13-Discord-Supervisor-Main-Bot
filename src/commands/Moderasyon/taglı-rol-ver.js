const db = require('quick.db')
const Discord = require('discord.js')
const config = require("../../../config.json");

module.exports = {
  name: "taver",
  aliases: ["tagver"],
  execute: async (client, message, args, guild, author, channel, embed, MessageEmbed) => {
     if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(` Bu komutu kullanabilmek için "\`yönetici\`" yetkisine sahip olmalısın`).then(x => {
    message.delete()
    setTimeout(() => {
      x.delete()
    }, 5000);
  })
    let rol = config.roles.team
    let tag = config.registration.GuilDTag
    message.guild.members.cache.filter(s => s.user.username.includes(tag) && !s.roles.cache.has(rol)).forEach(m => m.roles.add(rol))
    message.channel.send((`
Kullanıcı adında \`${tag}\` bulunduran kullanıcılara rol veriliyor.
`))


}
}