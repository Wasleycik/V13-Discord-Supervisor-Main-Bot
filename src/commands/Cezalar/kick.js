const Discord = require('discord.js')
const config = require("../../../config.json")

    module.exports = {
    name: "kick",
    aliases: ["kickle","at"],
    execute: async (client, message, args, embed, author, channel, guild) => {
       if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.penals.ban.staff)) return message.reply({ embeds: [embed.setDescription(`Komutu kullanmak için geçerli yetkin olmalı.`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        let kullanici = message.mentions.members.first();
        let sebep = args.slice(1).join(' ');

        if(!kullanici){
            const kullanicihata = new Discord.MessageEmbed()
            .setDescription(`${message.author} **Kicklenecek kişiyi etiketlemen gerekiyor.**`)
            .setColor('#ff0000')
            return message.channel.send({embeds:[kullanicihata]})
        }
        if(!sebep){
            const sebephata = new Discord.MessageEmbed()
            .setDescription(`${message.author} **Lütfen sebep belirt.**`)
            .setColor('#ff0000')
            return message.channel.send({embeds:[sebephata]})
        }

        if(kullanici && sebep){
            kullanici.kick()

            const kick =  new Discord.MessageEmbed()
            .setDescription(`${kullanici} Kullanıcısı ${message.author} Tarafından **${sebep}** Sebebiyle Sunucudan Kicklendi, Umarım Aynı Davranışları Tekrar Yapmaz.`)
            .setAuthor(`${message.author.username} - Başarılı Kick`, message.author.avatarURL({dynamic: true}))
            .setColor('RANDOM');
            message.channel.send({embeds:[kick]})
        }
    }

    }