const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "prefix",
    aliases: ["prefix"],
    category: "⛔️ Admin",
    description: "Vamos a cambiar el Prefijo del BOT",
    usage: "prefix <NUEVO PREFIJO>",
    memberpermissions: ["ADMINISTRATOR"],
    run: async (client, message, args) => {
    try{
    //get the current prefix from the database
    let prefix = client.settings.get(message.guild.id, `prefix`);
    //if not in the database for some reason use the default prefix
    if (prefix === null) prefix = config.prefix;
    //if no args return error
    if (!args[0])
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle("❌ Error | Proporcione un nuevo prefijo!")
        .setDescription(`Prefijo actual: \`${prefix}\``)
      );
    //if there are multiple arguments
    if (args[1])
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle("❌ Error | El prefijo no puede tener dos espacios")
      );
    //if the prefix is too long
    if (args[0].length > 5)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle("❌ Error | El prefijo no puede ser más largo que `5`")
      );
    //set the new prefix
    client.settings.set(message.guild.id, args[0], `prefix`);
    //return success embed
    return message.channel.send(new MessageEmbed()
      .setColor(ee.color)
      .setFooter(ee.footertext, ee.footericon)
      .setTitle(`✅ Éxito | Establecer nuevo prefijo para **\`${args[0]}\`**`)
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
};
/**
  * @INFO
  * Bot Coded by k4itrun#7101 | https://teamarcades.xyz
  * @INFO
  * Work for Team Arcades | https://teamarcades.xyz
  * @INFO
  * Please mention Him / Team Arcades, when using this Code!
  * @INFO
*/
