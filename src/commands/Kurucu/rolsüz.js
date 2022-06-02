const Discord = require("discord.js");
const ms = require("ms");
const config = require("../../../config.json");
const db = require("quick.db"); 
const moment = require("moment");
moment.locale("tr");

module.exports = {
    name: "rolsüz",
    aliases: ["rolsuz"],
    execute: async (client, message, args, embed, author, channel, guild) => {
 if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({content: "`Bu komutu kullanmak için **YÖNETİCİ** yetkisine sahip olmalısın!`"});
        let bg = message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guild.id).size == 0)
        if (args[0] == "ver") {
            bg.forEach(r => {
                r.roles.add(config.registration.unregistered)
            });
            message.reply({ embeds: [embed.setDescription("Sunucuda rolü olmayan \`"+ bg.size +"\` kişiye kayıtsız rolü verildi.")] }).catch((err) => console.log(err), client.ytick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        } else if (!args[0]) {
            message.reply({ embeds: [embed.setDescription("Sunucumuzda rolü olmayan \`"+ bg.size +"\` kişi var.")] }).catch((err) => console.log(err), client.ytick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));

let data = db.get(`kmtlog.${message.guild.id}`);
client.channels.cache.get(config.logs.komutlog).send({ embeds: [embed.setDescription(` 

<@${data.mesajyazan}> İsimli Üye \`(${moment(Date.now()).format("LLL")})\`  Tarihinde <#${data.kanal}> Kanalında Komut Kullandı : **${data.mesaj}**`)] });
        }
    }
}
