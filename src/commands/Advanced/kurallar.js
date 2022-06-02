const Discord = require("discord.js");


module.exports = {
    name: "kurallar",
    aliases: ["kurallar", "rules"],
    execute: async (client, message, args, embed, author, channel, guild) => {

 if (!message.member.permissions.has("ADMINISTRATOR"))  return message.reply({ embeds: [embed.setDescription(`Komutu kullanmak için geçerli yetkin olmalı.`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
  let csc = message.mentions.channels.first();



  message.delete()
const exampleEmbed = new Discord.MessageEmbed()
 .setColor("RANDOM")
 .setTitle(`**${message.guild.name}**`)
 .setDescription(`
                      ***• KURALLAR •***

**Reklam**
• Sözlü reklamlar, link ile reklam, özelden reklam, resim ile reklam ve benzeri şekilde reklamlar yapmak yasaktır.

**Küfür, Argo, Hakaret**
• Her kanalda küfür etmek ve argo kullanmak yasaktır.
• Üyelere karşı hakaret etmek ve dalga geçme yasaktır.

**Yetkililer ve Yetki**
• Yetki istemek yasaktır.
• Yetkili alımları ile ilgili soru sormak yasaktır.
• Yetkilileri boş yere @etiketlemek ve @etiketleyerek spam yapmak yasaktır.
• Yetkililere saygılı olun.

**Spam, Flood, Etiketleme**
• Spam yapmak yasaktır.
• Bir kelimeyi sürekli bir mesajda yazmak yasaktır.
• Flood yapmak alt alta yazmak yasaktır.
• Bir üyeyi sürekli @etiketlemek yasaktır.

**Din, Siyaset, Cinsellik**
• Din ile ilgili konuşmak, tartışmak, kullanıcı adlarını din ile ilgili koymak yasaktır.
• Siyaset ile ilgili konuşmak, tartışmak, kullanıcı adlarını siyaset ile ilgili koymak yasaktır.
• 18+ fotoğraflar paylaşmak ve konuşmak yasaktır.

**Kavga, Tartışmak**
• Kavga etmek, kavgaya dahil olmak ve tartışmak yasaktır.
• Herhangi bir sorununuz varsa yetkiliye danışınız

**Cezaları Ceza i işlem Kanalından Öğrenebilirsiniz**`)
  message.channel.send({embeds: [exampleEmbed]})
  
  
}}