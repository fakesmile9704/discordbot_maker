const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "embed",
    category: "Administration",
    aliases: ["say-embed"],
    cooldown: 2,
    usage: "embed <TITLE> ++ <DESCRIPTION>",
    description: "Reenvía un mensaje tuyo como Embed",
    run: async (client, message, args, user, text, prefix) => {
    try{
      if(!args[0])
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(client.user.username + " | powered by: teamarcades.xyz", client.user.displayAvatarURL())
            .setTitle(`❌ ERROR | No proporcionaste un Título, ni una Descripción`)
            .setDescription(`Usage: \`${prefix}embed <TITLE> ++ <DESCRIPTION>\``)
        );
      let userargs = args.join(" ").split("++");
      let title = userargs[0];
      let desc = userargs.slice(1).join(" ")
      message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(client.user.username + " | powered by: teamarcades.xyz", client.user.displayAvatarURL())
        .setTitle(title ? title : "")
        .setDescription(desc ? desc : "")
      )
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(client.user.username + " | powered by: teamarcades.xyz", client.user.displayAvatarURL())
            .setTitle(`❌ ERROR | Ocurrió un error`)
            .setDescription(`\`\`\`${e.message}\`\`\``)
        );
    }
  }
}
/** Coded by Team Arcades **/
