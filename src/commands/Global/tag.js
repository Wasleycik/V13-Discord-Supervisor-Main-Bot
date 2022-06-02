const moment = require("moment");
require("moment-duration-format");
const { MessageEmbed } = require("discord.js")
const config = require("../../../config.json");
const Discord = require("discord.js");
const ms = require("ms");
const db = require("quick.db"); 
moment.locale("tr");

module.exports = {
    name: "tag",
    aliases: ["tag"],

    execute: async (client, message, args, embed, author, channel, guild) => {
        message.reply({ content: `${config.registration.GuilDTag}`}) 

let data = db.get(`kmtlog.${message.guild.id}`);
client.channels.cache.get(config.logs.komutlog).send({ embeds: [embed.setDescription(` 

<@${data.mesajyazan}> İsimli Üye \`(${moment(Date.now()).format("LLL")})\`  Tarihinde <#${data.kanal}> Kanalında Komut Kullandı : **${data.mesaj}**`)] });
    }
}
