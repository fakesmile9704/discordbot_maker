const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const radiomodule = require("../../modules/radiomodule");
const fs = require("fs")
module.exports = {
    name: "setup",
    category: "Voice",
    aliases: ["resetup"],
    cooldown: 2,
    usage: "setup",
    description: "Joins your Channel and set the Radio to that!",
    run: async (client, message, args, user, text, prefix) => {
    try{
      if(message.author.id !== config.owner && !message.member.hasPermission("ADMINISTRATOR"))
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(client.user.username + " | powered by: teamarcades.xyz", client.user.displayAvatarURL())
            .setTitle(`❌ ERROR | You are not my OWNER! you are not allowed to run this Command`)
        );
      let {channel} = message.member.voice;
      let botchannel = message.guild.me.voice.channel;
      if(!channel)
          return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(client.user.username + " | powered by: teamarcades.xyz", client.user.displayAvatarURL())
              .setTitle(`❌ ERROR | Please join a Voice Channel, which you wanna set to your Waitingroom Channel`)
          );

      let oldconfig = config;
      oldconfig.channel = channel.id;
      oldconfig.guild = message.guild.id;

      fs.writeFile("./botconfig/config.json", JSON.stringify(oldconfig, null, 3), async (e) => {
          if (e) {
            console.log(String(e.stack).red);
            return message.channel.send(new MessageEmbed()
              .setFooter(ee.footertext,ee.footericon)
              .setColor(ee.wrongcolor)
              .setTitle("❌ ERROR Writing the File")
              .setDescription(`\`\`\`${e.stack}\`\`\``)
            )
          }
          if(botchannel) {
            await botchannel.leave()
          }
          setTimeout(()=>{
            radiomodule(client)
          }, 500)
          return message.channel.send(new MessageEmbed()
            .setColor(ee.color)
            .setFooter(client.user.username + " | powered by: teamarcades.xyz", client.user.displayAvatarURL())
            .setTitle(`✅ Success | Set the new Waitingroom channel to: \`${channel.name}\``)
          )
        });

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
