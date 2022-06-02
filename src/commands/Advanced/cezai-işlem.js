const Discord = require("discord.js");


module.exports = {
    name: "cezai-işlem",
    aliases: ["cezaiişlem", "ceza-i-işlem"],
    execute: async (client, message, args, embed, author, channel, guild) => {

 if (!message.member.permissions.has("ADMINISTRATOR"))  return message.reply({ embeds: [embed.setDescription(`Komutu kullanmak için geçerli yetkin olmalı.`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
  let csc = message.mentions.channels.first();


  message.delete()
const exampleEmbed = new Discord.MessageEmbed()
 .setColor("RANDOM")
 .setTitle(`**${message.guild.name}**`)
 .setDescription(`
                      ***• CEZA İ İŞLEM •***

**Mute Ceza Süreleri** 

• Milleti Kışkırtmak : 10 Dakika Mute
• Chatta Ahlaksızca Davranışlar Segilemek : 3 Saat Mute
• Chatta Spam Flood vb : 40 Dakika Mute
• Dini Değerlerle Alay Edip Dalga Geçmek : 1 Gün Ses Ve Chat Mute
• Irkçılık Ayrımcılık Yapmak : 1 Saat Mute
• Chatta Uygunsuz Fotoğraflar Kelimeler vb : 60 Dakika Mute

• Bu Yukardaki Gerekçeler Harici Boş Yere Mute Atmak Yasaktır Sonucu Olarakta Yetkiniz Düşebilir Veya Direkt Alınabilir Eğer Fazla Önemsiz Birşey İse Warn Atabilirsiniz

**Jail Ceza Süreleri**

• Mute Yedikten Sonra Haylağa Yaptığı Şeyi Devam Ettirmek : 4 Saat Jail
• Anneye Ailevi Değerlere Hakaret : 7 Gün Jail
• Yasaklı Tagda Bulunmak : Sonsuza Kadar Silivride Yatış
• Sunucuyu Kötülemek : 10 Saat Jail
• Sunucuda Reklam Yapmaya Çalışmak : 10 Gün Jail
• Allah'a  Atatürk'e  Din 'e  şehitlere Küfür : Sonsuza Kadar Silivride Sikerim
• Bir Kişiye Cinsel Fotoğraf Paylaşımları Cinsel Yönden Direk Tacizde Bulunma Eğer Yapılırsa Ben De Ona Bulunurum... : 20 Gün Jail
• Sunucuda Ses Ve Metin Kanallarında Troll Yapmak : 2 Saat Jail
• Milletin Özelini İfşalamak : 1 Gün Jail

• Bu Yukardaki Gerekçeler Harici Boş Yere Jail Atmak Yasaktır Sonucu Olarakta Yetkiniz Düşebilir Veya Direkt Alınabilir Eğer Fazla Önemsiz Birşey İse Mute Atabilirsiniz

**Ban Ceza Süreleri**

• Yukarıdaki Sebeplerin Devamlılığı : 1 Yıl Ban
Benim Kararıma Hal Ve Hareketlerinize Bağlı Olarak Sonsuza Kadar Banda Atabilirim 1 Saatte Farketmiyor

• Bu Yukardaki Gerekçeler Harici Boş Yere Ban Atmak Yasaktır Sonucu Olarakta Yetkiniz Alınır Eğer Fazla Önemsiz Birşey İse Jail Atabilirsiniz*

• Yetkiyi Kötüye Kullanım Sonucu Direkt Yetkiniz Alınır 

• Yetkililerimiz Sunucuda Üyelere Samimi Hakaret Etmeden Kendilerini Bir Bok Sanmadan Davranmalarını Rica Ederim Eğer Farklı Birşey Olursa Direkt Yetkinizi Alıp Silivride Ben Aynı Tavırları Size Uygularım Sormayın Gerikalanını Anladınız `)
  message.channel.send({embeds: [exampleEmbed]})
  
  
}}