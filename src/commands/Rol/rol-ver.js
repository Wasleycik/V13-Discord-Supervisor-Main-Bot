const Discord = require("discord.js")
const config = require("../../../config.json");
const db = require("quick.db"); 
const moment = require("moment");
moment.locale("tr");

module.exports = {
    name: "rol-ver",
    aliases: ["rolver", "rolv"],

    execute: async (client, message, args, author, channel, guild) => {

  if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply({ embeds: [embed.setDescription(`Komutu kullanmak için geçerli yetkin olmalı.`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));

  
  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if (!user) return message.reply("**⚠ Rol Vermek İstediğin Kişiyi Yazmalısın!**").catch(e => {});
  
  let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
  if (!rol) return message.reply("**⚠ Bir Rol Yazmalısın!**").catch(e => {});

  if(message.member.roles.highest.position < rol.rawPosition) return message.reply("**⚠ Bu Rolü Vermek İçin Üstünde Olmalısın!**").catch(e => {});

  user.roles.add(rol).catch(e => {
    return message.reply("**⚠ Bu Kişiye Rol Verilemedi! (Yetkim Yetmiyor)**").catch(e => {});
  });

  const embed = new Discord.MessageEmbed()
    .setColor("BLUE")
    .setTimestamp()
    .setDescription(`✅  Başarıyla ${user} İsimli Kullanıcıya ${rol} İsimli Rol Verildi!`)
  message.channel.send({embeds: [embed]}).catch(e => {})

 let data = db.get(`kmtlog.${message.guild.id}`);
client.channels.cache.get(config.logs.komutlog).send({ embeds: [embed.setDescription(` 

<@${data.mesajyazan}> İsimli Üye \`(${moment(Date.now()).format("LLL")})\`  Tarihinde <#${data.kanal}> Kanalında Komut Kullandı : **${data.mesaj}**`)] });
}

}