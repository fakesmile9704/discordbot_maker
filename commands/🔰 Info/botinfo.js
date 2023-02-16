const Discord = require("discord.js");
let os = require("os");
let cpuStat = require("cpu-stat");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const {duration } = require("../../handlers/functions")
module.exports = {
    name: "botinfo",
    aliases: ["info"],
    category: "🔰 Info",
    description: "Envía información detallada sobre el cliente.",
    usage: "botinfo",
    run: async (client, message, args, cmduser, text, prefix) => {
    try{
      cpuStat.usagePercent(function (e, percent, seconds) {
          if (e) {
              return console.log(String(e.stack).red);
          }
          const Duration = duration(client.uptime)
          let connectedchannelsamount = 0;
          let guilds = client.guilds.cache.map((guild) => guild);
          for (let i = 0; i < guilds.length; i++) {
              if (guilds[i].me.voice.channel) connectedchannelsamount += 1;
          }
          const botinfo = new Discord.MessageEmbed()
              .setAuthor(client.user.username, client.user.displayAvatarURL())
              .setTitle("__**Estadisticas:**__")
              .setColor(ee.color)
              .addField("⏳ Uso de memoria", `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}/ ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB\``, true)
              .addField("⌚️ Uptime ", `\`${Duration}\``, true)
              .addField("\u200b", `\u200b`, true)
              .addField("📁 Users", `\`${client.users.cache.size}\``, true)
              .addField("📁 Servers", `\`${client.guilds.cache.size}\``, true)
              .addField("\u200b", `\u200b`, true)
              .addField("📁 Canales de voz", `\`${client.channels.cache.filter((ch) => ch.type === "voice").size}\``, true)
              .addField("📁 Canales conectados", `\`${connectedchannelsamount}\``, true)
              .addField("\u200b", `\u200b`, true)
              .addField("👾 Discord.js", `\`v${Discord.version}\``, true)
              .addField("🤖 Node", `\`${process.version}\``, true)
              .addField("\u200b", `\u200b`, true)
              .addField("🤖 CPU", `\`\`\`md\n${os.cpus().map((i) => `${i.model}`)[0]}\`\`\``)
              .addField("🤖 CPU Uso", `\`${percent.toFixed(2)}%\``, true)
              .addField("🤖 Arch", `\`${os.arch()}\``, true)
              .addField("\u200b", `\u200b`, true)
              .addField("💻 Platform", `\`\`${os.platform()}\`\``, true)
              .addField("API Latency", `\`${client.ws.ping}ms\``, true)
              .setFooter("Coded by:    k4itrun#7101");
          message.channel.send(botinfo);
      });
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`❌ ERROR | Ocurrió un error`)
            .setDescription(`\`\`\`${e.message}\`\`\``)
        );
    }
  },
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
