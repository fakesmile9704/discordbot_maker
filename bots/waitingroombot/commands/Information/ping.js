const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "ping",
    category: "Information",
    aliases: ["latency"],
    cooldown: 2,
    usage: "ping",
    description: "Le brinda información sobre qué tan rápido el Bot puede responderle",
    run: async (client, message, args, user, text, prefix) => {
    try{
      message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(client.user.username + " | powered by: teamarcades.xyz", client.user.displayAvatarURL())
        .setTitle(`🏓 Pinging....`)
      ).then(msg=>{
        msg.edit(new MessageEmbed()
          .setColor(ee.color)
          .setFooter(client.user.username + " | powered by: teamarcades.xyz", client.user.displayAvatarURL())
          .setTitle(`🏓 Ping is \`${Math.round(client.ws.ping)}ms\``)
        );
      })
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
