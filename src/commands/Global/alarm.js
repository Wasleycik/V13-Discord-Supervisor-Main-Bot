const Discord = require("discord.js");
const ms = require("ms");
const config = require("../../../config.json");
const db = require("quick.db"); 
const moment = require("moment");
moment.locale("tr");

module.exports = {
    name: 'alarm',
    aliases: ["hatırlat"],
  
    execute: async (client, message, args, embed, author, channel, guild) => {

if(message.channel.id !== config.channels.botkomut) return message.reply({content: `Bu komutu Sadece <#${config.channels.botkomut}> kanalında kullanmalısın.`})

      let duration = args[0];
      let sure = args[1];
      let sebep = args[2];
      let user = message.author
      let bisi;
	  
	  if (!duration || duration >= '60')
	  {
      return message.reply(`Lütfen, geçerli bir süre belirtiniz.\nÖrnek olarak: .alarm 10 dakika sebep`);
      }

	 if (!sure || !sure == 'saniye' || !sure == 'dakika' || !sure == 'saat' || !sure == 'gün' ) 
	 {
	 return message.reply(`Süre belirtimi hatalı!\nÖrnek olarak: .alarm 10 dakika sebep`)
   }

  if (!sebep) return message.reply('Lütfen, bir sebep belirtiniz.')
	 
	 message.reply(`Hatırlatıcı, başarılı bir şekilde ayarlandı!`)
                 
	  if (sure == 'saniye') bisi = 'seconds'
    if (sure == 'dakika') bisi = 'minutes'
    if (sure == 'saat') bisi = 'hours'
    if (sure == 'gün') bisi = 'days' 
	
      setTimeout(function(){
        let Zamanlayıcı = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(`Hatırlatma sistemi!`, client.user.displayAvatarURL)
        .addField(`${message.author.username}, süre doldu!`, `Süre dolduğundan dolayı hatırlatıcı devreye girdi.`)
        .addField(`Hatırlatma nedeni ise;`, sebep)

       return message.channel.send({embeds : [Zamanlayıcı]});
      }, ms(`${duration} ${bisi}`));
    
client.channels.cache.get(config.logs.komutlog).send({ embeds: [embed.setDescription(`${message.author} alarm Komutunu Kullanarak alarm kurdu
      
        \`Kullanıcı :\` ${message.author} - (**${message.author.id}**) 
        \`Sebep :\`  ${sebep}   
        \`Komutu Kullandığı Zaman :\` ${moment(Date.now()).format("LLL")}`)] });

let data = db.get(`kmtlog.${message.guild.id}`);
client.channels.cache.get(config.logs.komutlog).send({ embeds: [embed.setDescription(` 

<@${data.mesajyazan}> İsimli Üye \`(${moment(Date.now()).format("LLL")})\`  Tarihinde <#${data.kanal}> Kanalında Komut Kullandı : **${data.mesaj}**`)] });

}




}