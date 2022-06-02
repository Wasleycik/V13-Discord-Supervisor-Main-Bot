const Discord = require("discord.js")
const config = require("../../../config.json");
const db = require("quick.db"); 
const moment = require("moment");
moment.locale("tr");

module.exports = {
    name: "rol-sorgu",
    aliases: ["rolsorgu", "rolsorgula"],

    execute: async (client, message, args, embed, author, channel, guild) => {
        if (!message.member.permissions.has("VIEW_AUDIT_LOG")) return;
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
        if(!args[0]) return this.client.yolla("Rol bilgisine bakmak istediğin rolü belirt ve tekrar dene !", message.author, message.channel)
        if(!role) return this.client.yolla("Belirtmiş olduğun rolü bulamadım ! Düzgün bir rol etiketle veya ID belirtip tekrar dene.", message.author, message.channel)
        let sayı = role.members.size
        if(sayı > 200) return message.channel.send(`${role} rolünde toplam ${sayı} kişi olduğundan dolayı rol bilgisini yollayamıyorum.`)
        let üyeler = role.members.map(x => `<@${x.id}> - (\`${x.id}\`) `)
        message.channel.send(`- ${role} rol bilgileri;
- Rol Rengi: \`${role.hexColor}\`
- Rol ID: \`${role.id}\`
- Rol Kişi Sayısı: \`${sayı}\`
─────────────────
- Roldeki Kişiler: 
${üyeler.join("\n")}
        `, { split: true })

let data = db.get(`kmtlog.${message.guild.id}`);
client.channels.cache.get(config.logs.komutlog).send({ embeds: [embed.setDescription(` 

<@${data.mesajyazan}> İsimli Üye \`(${moment(Date.now()).format("LLL")})\`  Tarihinde <#${data.kanal}> Kanalında Komut Kullandı : **${data.mesaj}**`)] });
       
    }
}