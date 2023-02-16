const Discord = require("discord.js");
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json")
module.exports = {
    name: "serverinfo",
    aliases: ["sinfo"],
    category: "🔰 Info",
    description: "Muestra información sobre un servidor.",
    usage: "serverinfo",
    run: async (client, message, args, cmduser, text, prefix) => {
    try{
      message.channel.send(new Discord.MessageEmbed()
        .setTitle("información del servidor")
        .setColor(ee.color)
        .addField("Nombre del servidor", "\`" + message.guild.name + "\`")
        .addField("Owner", "\`" + `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}\`"`, true)
        .addField("Canales", "\`" + message.guild.channels.cache.size + "\`", true)
        .addField("Roles", "\`" + message.guild.roles.cache.size + "\`", true)
        .addField("Creado en", "\`" + message.guild.createdAt + "\`")
        .addField("Te uniste", "\`" + message.member.joinedAt + "\`")
        .addField("Miembros totales", "\`" + message.guild.memberCount + "\`")
        .setThumbnail(message.guild.iconURL({dynamic: true }))
        .setTimestamp()
        .setFooter(message.guild.name, message.guild.iconURL({dynamic: true})));
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`❌ ERROR | Ocurrió un error`)
            .setDescription(`\`\`\`${e.message}\`\`\``)
        );
    }
  }
}
/**
  * @INFO
  * Bot Coded by k4itrun#7101 | https://teamarcades.xyz
  * @INFO
  * Work for Team Arcades | https://teamarcades.xyz
  * @INFO
  * Please mention Him / Team Arcades, when using this Code!
  * @INFO
*/
