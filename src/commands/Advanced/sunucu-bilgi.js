const { MessageEmbed } = require("discord.js");
const config = require("../../../config.json");
const db = require("quick.db"); 
const moment = require("moment");
moment.locale("tr");

module.exports = {
    name: "sunucubilgi",
    aliases: ["server-info"],
    execute: async (client, message, args, anan, author, channel, guild) => {

if(message.channel.id !== config.channels.botkomut) return message.reply({content: `Bu komutu Sadece <#${config.channels.botkomut}> kanalında kullanmalısın.`})
  const filterLevels = {
    DISABLED: "Off",
    MEMBERS_WITHOUT_ROLES: "No Role",
    ALL_MEMBERS: "Everyone"
  };

  const verificationLevels = {
    NONE: "None",
    LOW: "Low",
    MEDIUM: "Medium",
    HIGH: "(╯°□°）╯︵ ┻━┻",
    VERY_HIGH: "┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻"
  };


  const roles = message.guild.roles.cache
    .sort((a, b) => b.position - a.position)
    .map(role => role.toString());
  const members = message.guild.members.cache
  const channels = message.guild.channels.cache;
  const emojis = message.guild.emojis.cache;

  const embed = new MessageEmbed()
    .setAuthor({name: `Sunucu Bilgileri ${message.guild.name}`})
    .setColor("BLUE")
    .setThumbnail(message.guild.iconURL({ dynamic: true }))
    .addField("Genel", 
      `**❯ Sunucu İsim:** \`${message.guild.name}\`\n`+
      `**❯ ID:** \`${message.guild.id}\`\n`+
      `**❯ Kurucu:** \`${client.users.cache.get(message.guild.ownerId).username}\`\n`+
      `**❯ Bölge:** \`${message.guild.preferredLocale}\`\n`+
      `**❯ Boost Seviyesi:** \`${message.guild.premiumTier ? `Level ${message.guild.premiumTier}` : "None"}\`\n`+
      `**❯ Açık Filtre:** \`${filterLevels[message.guild.explicitContentFilter]}\`\n`+
      `**❯ Doğrulama Seviyesi:** \`${verificationLevels[message.guild.verificationLevel]}\`\n`+
      `**❯ Oluşturma Zamanı:** \`${moment(message.guild.createdTimestamp).format("LT")} ${moment(message.guild.createdTimestamp).format("LL")} ${moment(message.guild.createdTimestamp).fromNow()}\`\n`+
      `**❯** [Sunucu Simgesi](${message.guild.iconURL({ dynamic: true })})\n`+
      `**❯ Özellikler:** \`${message.guild.features.join(", ") || "None"}\``)

    .addField("İstatistik",
      `**❯ Rol Sayısı:** \`${roles.length}\`\n`+
      `**❯ Emoji Sayısı:** \`${emojis.size}\`\n`+
      `**❯ Normal Emoji Sayısı:** \`${emojis.filter(emoji => !emoji.animated).size}\`\n`+
      `**❯ Hareketli Emoji Sayısıt:** \`${emojis.filter(emoji => emoji.animated).size}\`\n`+
      `**❯ Metin Kanalları:** \`${channels.filter(channel => channel.type === "GUILD_TEXT").size}\`\n`+
      `**❯ Ses Kanalları:** \`${channels.filter(channel => channel.type === "GUILD_VOICE").size}\`\n`+
      `**❯ Boost Sayısı:** \`${message.guild.premiumSubscriptionCount || "0"}\``)

    .addField("Mevcudiyet",
      `**❯ Toplam Üye:** \`${message.guild.memberCount}\`\n`+
      `**❯ insanlar:** \`${members.filter(member => !member.user.bot).size}\`\n`+
      `**❯ Botlar:** \`${members.filter(member => member.user.bot).size}\`\n`)
    .setFooter({ text: client.user.username, iconURL: client.user.avatarURL()})
    .setTimestamp();
  if (message.guild.description)
    embed.setDescription("**Sunucu Açıklaması:** "+ message.guild.description);
  message.reply({embeds: [embed]})

let data = db.get(`kmtlog.${message.guild.id}`);
client.channels.cache.get(config.logs.komutlog).send({ embeds: [embed.setDescription(` 

<@${data.mesajyazan}> İsimli Üye \`(${moment(Date.now()).format("LLL")})\`  Tarihinde <#${data.kanal}> Kanalında Komut Kullandı : **${data.mesaj}**`)] });
  
    }}