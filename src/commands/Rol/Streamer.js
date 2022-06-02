const Discord = require("discord.js")
const config = require("../../../config.json");
const db = require("quick.db"); 
const moment = require("moment");
moment.locale("tr");
const limit = new Map();


module.exports = {
    name: "streamer",
    aliases: ["streamer", "yayıncı"],

    execute: async (client, message, args, embed, author, channel, guild) => {

       if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply({ embeds: [embed.setDescription(`Komutu kullanmak için geçerli yetkin olmalı.`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
if(message.channel.id !== config.channels.botkomut) return message.reply({content: "Bu komutu bot komut kanalında kullanmalısın."})
        var member = message.mentions.users.first() || guild.members.cache.get(args[0]);
        if (!member) return message.reply({ embeds: [embed.setDescription("Öncelikle geçerli bir kullanıcı belirtmelisin!")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        if (member.id === author.id) return message.reply({ embeds: [embed.setDescription("Kendine bu rolü veremezsin!")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        
        guild.members.cache.get(member.id).roles.add(config.roles.streamer);
        message.reply({ embeds: [embed.setDescription(`${member} kullanıcısına <@&${config.roles.streamer}> rolü verildi.`)] });
        if (config.bot.dmMessages) member.send(`**${message.guild.name}** sunucumuzda başarıyla, **${message.author.tag}** yetkilisi tarafından özel rolün verildi.`).catch(() => {});
        
        embed.setColor("e4b400")
        client.channels.cache.get(config.logs.rollog).send({ embeds: [embed.setDescription(`${member} kullanıcısına ${message.author} tarafından <@&${config.roles.streamer}> rolü verildi.
      
        \`Rolü Alan Kullanıcı:\` ${member} - (**${member.id}**)
        \`Rolü Veren Yetkili:\` ${message.author} - (**${message.author.id}**)
        \`Verilen Rol:\` <@&${config.roles.streamer}>     
        \`Rol Verilme Tarihi:\` ${moment(Date.now()).format("LLL")}`)] });

 let data = db.get(`kmtlog.${message.guild.id}`);
client.channels.cache.get(config.logs.komutlog).send({ embeds: [embed.setDescription(` 

<@${data.mesajyazan}> İsimli Üye \`(${moment(Date.now()).format("LLL")})\`  Tarihinde <#${data.kanal}> Kanalında Komut Kullandı : **${data.mesaj}**`)] });
    }
}
