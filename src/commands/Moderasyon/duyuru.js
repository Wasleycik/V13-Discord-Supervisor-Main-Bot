const config = require("../../../config.json")
const db = require('quick.db');
const Discord = require("discord.js");
const moment = require("moment");

module.exports = {
    name: 'duyuru',
    aliases: [],
  
    execute: async (client, message, args, embed, author, channel, guild) => {
  if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.Guild.GuildOwnerRole) && !message.member.permissions.has(8)) return message.reply({ embeds: [embed.setDescription(`Komutu kullanmak için geçerli yetkin olmalı!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
  let csc = message.mentions.channels.first();
  if (!csc) return message.reply({content: "**Bir Kanal Etiketlemen Gerek!**" });
  let csm = args.slice(1).join(" ");
  if (!csm) return message.reply({ content: "**Ne Duyurusu Yapılacak Yazman Gerek!**" });

    
  csc.send(`**${message.guild.name}** \n\n ${csm}`);

  setTimeout(() => {
    csc.send({ content: "@everyone" }).then(csmm => {
      csmm.delete();
    });
  }, 2000);
let data = db.get(`kmtlog.${message.guild.id}`);
client.channels.cache.get(config.logs.komutlog).send({ embeds: [embed.setDescription(` 

<@${data.mesajyazan}> İsimli Üye \`(${moment(Date.now()).format("LLL")})\`  Tarihinde <#${data.kanal}> Kanalında Komut Kullandı : **${data.mesaj}**`)] });
}}