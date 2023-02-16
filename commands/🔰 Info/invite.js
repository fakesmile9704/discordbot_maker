const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "invite",
    category: "🔰 Info",
    aliases: ["add"],
    cooldown: 5,
    usage: "invite",
    description: "Te da un enlace de Invitación para este Bot",
    run: async (client, message, args, user, text, prefix) => {
    try{
      message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setTitle(":heart: ¡Gracias por invitarme!")
        .setFooter(ee.footertext, ee.footericon)
        .setURL("https://discord.com/api/oauth2/authorize?client_id=986336804229767209&permissions=51200&scope=bot")
        .setDescription("[haga clic aquí](https://discord.com/api/oauth2/authorize?client_id=986336804229767209&permissions=51200&scope=bot)")
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
