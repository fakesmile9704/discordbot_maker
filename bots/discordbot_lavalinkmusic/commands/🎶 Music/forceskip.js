const {
  MessageEmbed
} = require("discord.js");
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const {
  autoplay,
} = require(`${process.cwd()}/handlers/functions`);
module.exports = {
  name: "skip",
  category: "🎶 Music",
  aliases: ["fs", "s", "next"],
  description: "Force Skips the current song",
  usage: "skip",
  parameters: {
    "type": "music",
    "activeplayer": true,
    "check_dj": true,
    "previoussong": false
  },
  type: "song",
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
      //get the channel instance from the Member
      const {
        channel
      } = message.member.voice;
      //if the member is not in a channel, return
      if (!channel){
        return message.reply({
          embeds: [new MessageEmbed()
            .setColor(es.wrongcolor)
            .setTitle(client.la[ls].common.join_vc)
          ]
        });
      }
      //if no player available return aka not playing anything
      if (!player) {
        if (message.guild.me.voice.channel) {
          message.guild.me.voice.disconnect().catch(() => {});
          message.reply({
            embeds: [new MessageEmbed()
              .setTitle(client.la[ls].cmds.music.skip.title)
              .setColor(es.color)
            ]
          });
          return message.react(emoji.react.stop).catch((e) => {})
        } else {
          return message.reply({
            embeds: [new MessageEmbed()
              .setColor(es.wrongcolor)
              .setTitle(client.la[ls].common.nothing_playing)
            ]
          });
        }
        return
      }
      //if not in the same channel as the player, return Error
      if (channel.id !== player.voiceChannel)
        return message.reply({
          embeds: [new MessageEmbed()
            .setColor(es.wrongcolor)
            .setTitle(client.la[ls].common.wrong_vc)
            .setDescription(eval(client.la[ls]["cmds"]["music"]["skip"]["variable1"]))
          ]
        });
      //if ther is nothing more to skip then stop music and leave the Channel
      if (player.queue.size == 0) {
        //if its on autoplay mode, then do autoplay before leaving...
        if (player.get("autoplay")) return autoplay(client, player, "skip");
        if (message.guild.me.voice.channel) {
          message.guild.me.voice.disconnect().catch(() => {});
          player.destroy();
          message.reply({
            embeds: [new MessageEmbed()
              .setTitle(client.la[ls].cmds.music.skip.title)
              .setColor(es.color)
            ]
          });
          return message.react(emoji.react.stop).catch((e) => {})
        } else {
          //stop playing
            player.destroy();
          message.reply({
            embeds: [new MessageEmbed()
              .setTitle(client.la[ls].cmds.music.skip.title)
              .setColor(es.color)
            ]
          });
          //React with the emoji
          return message.react(emoji.react.stop).catch((e) => {})
        }
        return
      }
      //skip the track
      player.stop();
      //react with emoji
      message.react(emoji.react.skip_track).catch((e) => {})
      //send success message
      return message.reply({
        embeds: [new MessageEmbed()
          .setTitle(client.la[ls].cmds.music.skip.title2)
          .setColor(es.color)
        ]
      });
      
  }
};
 
