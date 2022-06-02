const db = require('quick.db')
const Discord = require('discord.js')
 

module.exports = {
    name: "saas",
    aliases: ["sa-as","selam-sistemi"],
    execute: async (client, message, args, author, channel, guild) => {

if(!message.member.permissions.has("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için \`YÖNETİCİ\` yetkisine sahip olmalısın.`);

  if (!args[0]) return message.reply(`Aktifleştirmeli yada kapatmalısın!! Örnek: **selam-sistemi Aktif**`).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
 
  if (args[0] === 'aç') {
    
    db.set(`saas_${message.guild.id}`, 'acik')
    message.reply(`Selam Sistemi Başarılı Bir Şekilde Açıldı Kapatmak İçin "\`selam-sistemi kapat\`".`).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
 
  }
  
  if (args[0] === 'kapat') {
    
    db.set(`saas_${message.guild.id}`, 'kapali')
    message.reply(`Selam Sistemi Başarılı Bir Şekilde Kapatıldı Açmak İçin "\`selam-sistemi aç\`".`).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})

  }
 
}
}