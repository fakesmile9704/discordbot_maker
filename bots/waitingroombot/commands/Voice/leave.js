const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const radiomodule = require("../../modules/radiomodule");
const fs = require("fs")
module.exports = {
    name: "leave",
    category: "Voice",
    aliases: [""],
    cooldown: 2,
    usage: "leave",
    description: "Leaves the Setupped Channel",
    run: async (client, message, args, user, text, prefix) => {
      try{
        let botchannel = message.guild.me.voice.channel;

            if(!botchannel) {
              return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(client.user.username + " | powered by: teamarcades.xyz", client.user.displayAvatarURL())
                .setTitle(`:x: Not Connected to: \`${config.channel}\``)
              )
            }
            message.channel.send(new MessageEmbed()
              .setColor(ee.color)
              .setFooter(client.user.username + " | powered by: teamarcades.xyz", client.user.displayAvatarURL())
              .setTitle(`Leaving...: \`${botchannel.name}\``)
            )
            botchannel.leave();
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
  /**
    * @INFO
    * Bot Coded by k4itrun#7101 | https://teamarcades.xyz/discord
    * @INFO
    * Work for Team Arcades | https://teamarcades.xyz
    * @INFO
    * Please mention Him / Team Arcades, when using this Code!
    * @INFO
  */
