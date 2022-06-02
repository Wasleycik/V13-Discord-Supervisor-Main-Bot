const { MessageEmbed } = require('discord.js');
const Discord = require("discord.js");
const ms = require("ms");
const config = require("../../../config.json");
const db = require("quick.db"); 
const moment = require("moment");
moment.locale("tr");
module.exports = {
    name: "link",
    aliases:  ['url', 'özelurl', 'sunuculink'],
    execute: async (client, message, args, embed, author, channel, guild) => {

    message.reply(config.bot.guildVanityURL);

let data = db.get(`kmtlog.${message.guild.id}`);
client.channels.cache.get(config.logs.komutlog).send({ embeds: [embed.setDescription(` 

<@${data.mesajyazan}> İsimli Üye \`(${moment(Date.now()).format("LLL")})\`  Tarihinde <#${data.kanal}> Kanalında Komut Kullandı : **${data.mesaj}**`)] });

}}