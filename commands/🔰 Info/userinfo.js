const Discord = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "userinfo",
    aliases: ["uinfo"],
    category: "🔰 Info",
    description: "Obtener información sobre un usuario",
    usage: "userinfo [@USER]",
    run: async (client, message, args, cmduser, text, prefix) => {
    try{
      const user = message.mentions.users.first() || message.author;
      if (!user)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle("❌ Error | Mencione el usuario sobre el que desea obtener información")
        );
      message.channel.send(new Discord.MessageEmbed()
        .setTitle("User Info:")
        .addField("Nombre de usuario completo", `\`${user.tag}\``)
        .addField("ID", `\`${user.id}\``)
        .addField("Jugando", `\`[ ${user.presence.activities} ]\``, true)
        .addField("Status", `\`${user.presence.status}\``, true)
        .addField("Se unió a Discord en",`\`${user.createdAt}\``)
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setThumbnail(user.displayAvatarURL({dynamic: true, size: 1024}))
      );
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
