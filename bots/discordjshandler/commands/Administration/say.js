const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "say",
    category: "Administration",
    aliases: [""],
    cooldown: 2,
    usage: "say <TEXT>",
    description: "Reenvía tu Texto",
    run: async (client, message, args, user, text, prefix) => {
    try{
      if(!args[0])
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(client.user.username + " | powered by: teamarcades.xyz", client.user.displayAvatarURL())
            .setTitle(`❌ ERROR | No proporcionó un texto`)
            .setDescription(`Uso: \`${prefix}say <Tu Texto>\``)
        );
      message.channel.send(text);
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
