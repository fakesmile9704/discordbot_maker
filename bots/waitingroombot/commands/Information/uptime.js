const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const { duration } = require("../../handlers/functions")
module.exports = {
    name: "uptime",
    category: "Information",
    aliases: [""],
    cooldown: 10,
    usage: "uptime",
    description: "Devuelve la duración de cuánto tiempo el Bot está en línea",
    run: async (client, message, args, user, text, prefix) => {
    try{
      message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(client.user.username + " | powered by: teamarcades.xyz", client.user.displayAvatarURL())
        .setTitle(`:white_check_mark: **${client.user.username}** es desde:\n ${duration(client.uptime)} en línea`)
      );
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(client.user.username + " | powered by: teamarcades.xyz", client.user.displayAvatarURL())
            .setTitle(`❌ ERROR | Ocurrió un error`)
            .setDescription(`\`\`\`${e.stack}\`\`\``)
        );
    }
  }
}
/** Coded by Team Arcades **/
