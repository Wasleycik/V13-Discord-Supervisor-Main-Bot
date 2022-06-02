const Discord = require('discord.js')
const db = require('quick.db')


module.exports = {
    name: "caps-koruma",
    aliases: ['capsengel', 'caps-engel'],
    execute: async (client, message, args, embed, author, channel, guild) => {

   if (!message.member.permissions.has('MANAGE_GUILD')) return message.channel.send({embeds:[
            new Discord.MessageEmbed()
              .setColor("#ff0000")
              .setTimestamp()
              .setDescription('Bu komudu kullanabilmek için `SUNUCUYU YÖNET` yetkisine sahip olman gerek.')]})
   if (!args[0]) return message.channel.send({embeds:[
            new Discord.MessageEmbed()
              .setColor("#ff0000")
              .setTimestamp()
              .setDescription(`Lütfen **aç** ya da **kapat** Yazın!`)]})
  if (args[0] !== 'aç' && args[0] !== 'kapat') return message.channel.send({embeds:[
                new Discord.MessageEmbed()
                .setColor("#ff0000")
                .setTimestamp()
                .setDescription(`Lüten **aç** ya da **kapat** Yazın!`)]})
  
  if(args[0] === 'aç') {
    let acikmi = await db.fetch(`${message.guild.id}_caps`)
    if(acikmi == "acik") return message.channel.send({embeds:[
      new Discord.MessageEmbed()
                .setColor("#ff0000")
                .setTimestamp()
                .setDescription('Caps-Lock Filtresi zaten açık ki!')]})
    db.set(`${message.guild.id}_caps`, 'acik')
    message.channel.send({embeds:[
              new Discord.MessageEmbed()
              .setColor("#ff0000")
              .setTimestamp()
              .setDescription('Caps-lock filtresi Başarılı Şekilde Aktif Edildi. Bot `ÜYELERİ_AT` yetkisi Olanların Mesajını Silmeyecektir.')]})

}

  if (args[0] === 'kapat') {
    if(db.has(`${message.guild.id}_caps`)){
    db.delete(`${message.guild.id}_caps`, 'acik')
  message.channel.send({embeds:[
              new Discord.MessageEmbed()
              .setColor("#ff0000")
              .setTimestamp()
              .setDescription(`Caps-lock Filtresini başarıyla Kapattım.`)]})
} else return message.channel.send({embeds:[
  new Discord.MessageEmbed()
  .setColor("#ff0000")
  .setTimestamp()
  .setDescription(`Caps-lock Filtresi zaten ayarlanmamış!`)]})
  }
}}