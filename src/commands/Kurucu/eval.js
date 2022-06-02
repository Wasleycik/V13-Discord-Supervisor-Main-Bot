const Discord = require("discord.js");
const ms = require("ms");
const config = require("../../../config.json");
const db = require("quick.db"); 
const moment = require("moment");
moment.locale("tr");

module.exports = {
    name: "eval",
    aliases: ["evall"],
    owner: true,
    execute: async (client, message, args, embed, author, channel, guild) => {
        if (!args[0]) return message.reply({ embeds: [embed.setDescription("Komutu kullanmak için geçerli yetkin olmalı!")] });
        let code = args.join(" ");

        try {
            var result = clean(await eval(code));
            if (result.includes(client.token))
                return message.reply({ embeds: [embed.setDescription("token alamzsn knk")] });
            channel.send(result, { code: "js", split: true });
        } catch (err) {
            channel.send(err, { code: "js", split: true });
        }
    },
};

function clean(text) {
    if (typeof text !== "string")
        text = require("util").inspect(text, { depth: 0 });
    text = text
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203));
    return text;
}

