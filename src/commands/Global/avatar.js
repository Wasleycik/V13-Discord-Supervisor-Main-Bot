const Discord = require("discord.js");
const ms = require("ms");
const config = require("../../../config.json");
const db = require("quick.db"); 
const moment = require("moment");
moment.locale("tr");

module.exports = {
    name: "avatar",
    aliases: ["avatar"],
    execute: async (client, message, args, embed, author, channel, guild) => {

if(message.channel.id !== config.channels.botkomut) return message.reply({content: `Bu komutu Sadece <#${config.channels.botkomut}> kanalında kullanmalısın.`})

let muser = message.mentions.users.first();
let userid;
if(isNaN(args[0])){
  if(!muser){
    userid = message.author.id;
  }else{
    userid = muser.id;
  }
}else{
  userid = args[0];
}
try{
let user = await client.users.fetch(userid);
let avatar = user.displayAvatarURL({dynamic: true, size: 1024})
if(avatar.endsWith(".gif?size=1024")) {

let embed = new Discord.MessageEmbed()
.setAuthor({name: user.tag , iconURL: user.displayAvatarURL()})
.setDescription(`**[[PNG]](${user.displayAvatarURL({ format: 'png', size: 1024 })})** | **[[JPEG]](${user.displayAvatarURL({ format: 'jpeg', size: 1024 })})** | **[[GIF]](${user.displayAvatarURL({ format: 'gif', size: 1024 })})** | **[[WEBP]](${user.displayAvatarURL({ format: 'webp', size: 1024 })})**`)
.setImage(user.displayAvatarURL({dynamic: true, size: 1024}))
.setColor("RANDOM")
message.channel.send({embeds: [embed]})

} else {

  let embed = new Discord.MessageEmbed()
.setAuthor({name: user.tag , iconURL: user.displayAvatarURL()})
.setDescription(`**[[PNG]](${user.displayAvatarURL({ format: 'png',  size: 1024 })})** | **[[JPEG]](${user.displayAvatarURL({ format: 'jpeg',  size: 1024 })})** | **~~[GIF]~~** | **[[WEBP]](${user.displayAvatarURL({ format: 'webp',  size: 1024 })})**`)
.setImage(user.displayAvatarURL({dynamic: true, size: 1024}))
.setColor("RANDOM")
message.channel.send({embeds: [embed]})

}
}catch{
    const a = new Discord.MessageEmbed().setColor("RANDOM").setDescription("Kullanıcı Bulunamadı.:(")
  message.channel.send({embeds: [a]});
  return;

}
     let data = db.get(`kmtlog.${message.guild.id}`);
client.channels.cache.get(config.logs.komutlog).send({ embeds: [embed.setDescription(` 

<@${data.mesajyazan}> İsimli Üye \`(${moment(Date.now()).format("LLL")})\`  Tarihinde <#${data.kanal}> Kanalında Komut Kullandı : **${data.mesaj}**`)] }); 

}}