const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const { duration } = require("../../handlers/functions")
module.exports = {
    name: "stats",
    category: "🔰 Info",
    aliases: [""],
    cooldown: 10,
    usage: "stats",
    description: "Muestra las estadísticas del bot",
    run: async (client, message, args, user, text, prefix) => {
    try{
      let botssize = 0;
      let waitingroombots = 0;
      let jointocreatebots = 0;
      let discordjshandlers = 0;
      let musicbots = 0;
      for(const gid of client.guilds.cache.map(g => g.id)){
        try{
          client.stats.ensure(gid, {
            commands: 0,
            Bots: 0,
            messages: 0,
            waitingroombot: 0,
            jointocreatebot: 0,
            discordjshandler: 0,
            musicbot: 0
          })
          botssize += Math.ceil(client.stats.get(gid, "Bots"));
          waitingroombots += Math.ceil(client.stats.get(gid, "waitingroombot"));
          jointocreatebots += Math.ceil(client.stats.get(gid, "jointocreatebot"));
          discordjshandlers += Math.ceil(client.stats.get(gid, "discordjshandler"));
          musicbots += Math.ceil(client.stats.get(gid, "musicbot"));
        }catch{}
      }
      let global = client.stats.get("global");
      let guild = client.stats.get(message.guild.id);
      message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .addField("⚙️ Comandos GLOBALES utilizados:", `>>> \`${global.commands} Comandos\` Usados\nen **todos** los servidores`,true)
        .addField("📰 Configuraciones GLOBALES creadas:", `>>> \`${botssize} Bots\` creado en\n**todos** los servidores`,true)
        .addField("📰 Cada recuento de configuración de bot:", `>>> \`${waitingroombots} Bots de sala de espera\`\n\`${jointocreatebots} Únete para crear bots\`\n\`${discordjshandlers} Discord js Handler Bots\`\n\`${musicbots} Music Bots\``)
        .addField("\u200b", "\u200b")
        .addField("⚙️ SERVIDOR Comandos usados:", `>>> \`${guild.commands} Comandos\` usados en\n**este** Servidor`,true)
        .addField("📰 SERVIDOR Configuraciones creadas:", `>>> \`${client.stats.get(message.guild.id, "Bots")} Bots\` creados en\n**este** Servidores`,true)
        .addField("\u200b", "\u200b")
        .setTitle(`💿 Las estadísticas de ${client.user.username}`)
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
/** Coded by Team Arcades **/
