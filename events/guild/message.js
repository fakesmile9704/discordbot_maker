/**
  * @INFO
  * Loading all needed File Information Parameters
*/
const config = require("../../botconfig/config.json"); //loading config file with token and prefix, and settings
const ee = require("../../botconfig/embed.json"); //Loading all embed settings like color footertext and icon ...
const Discord = require("discord.js"); //this is the official discord.js wrapper for the Discord Api, which we use!
const { escapeRegex} = require("../../handlers/functions"); //Loading all needed functions
//here the event starts
module.exports = async (client, message) => {
  try {
    client.stats.ensure("global", {
        commands: 0,
        Bots: 0,
        messages: 0,
        waitingroombot: 0,
        jointocreatebot: 0,
        discordjshandler: 0,
        musicbot: 0,
        discordbot600cmd: 0
    })
    //if the message is not in a guild (aka in dms), return aka ignore the inputs
    if (!message.guild) return;
    client.stats.ensure(message.guild.id, {
      commands: 0,
      Bots: 0,
      messages: 0,
      waitingroombot: 0,
      jointocreatebot: 0,
      discordjshandler: 0,
      musicbot: 0
    })
    client.settings.ensure(message.guild.id, {
      prefix: config.prefix
    })
    // if the message  author is a bot, return aka ignore the inputs
    if (message.author.bot) return;
    //if the channel is on partial fetch it
    if (message.channel.partial) await message.channel.fetch();
    //if the message is on partial fetch it
    if (message.partial) await message.fetch();
    //get the current prefix from the database
    let prefix = client.settings.get(message.guild.id, "prefix");
    //if not in the database for some reason use the default prefix
    if (prefix === null) prefix = config.prefix;
    //the prefix can be a Mention of the Bot / The defined Prefix of the Bot
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
    //if its not that then return
    if (!prefixRegex.test(message.content)) return;
    //now define the right prefix either ping or not ping
    const [, matchedPrefix] = message.content.match(prefixRegex);
    //create the arguments with sliceing of of the rightprefix length
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    //creating the cmd argument by shifting the args by 1
    const cmd = args.shift().toLowerCase();
    //if no cmd added return error
     if (cmd.length === 0){
      if(matchedPrefix.includes(client.user.id))
        return message.channel.send(new Discord.MessageEmbed()
          .setColor(ee.color)
          .setFooter(ee.footertext,ee.footericon)
         // .setTitle(`¿Hugh? ¿Me hicieron ping? Voy a darte algo de ayuda`)
          .setDescription(`<:arcades:1043198087931367545> ***Comience con <@${client.user.id}>\`help\` o \`${prefix}help\`!***`)
        );
      return;
      }
    //get the command from the collection
    let command = client.commands.get(cmd);
    //if the command does not exist, try to get it by his alias
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    //if the command is now valid
    if (command){
        if (!client.cooldowns.has(command.name)) { //if its not in the cooldown, set it too there
            client.cooldowns.set(command.name, new Discord.Collection());
        }
        const now = Date.now(); //get the current time
        const timestamps = client.cooldowns.get(command.name); //get the timestamp of the last used commands
        const cooldownAmount = (command.cooldown || 1.5) * 1000; //get the cooldownamount of the command, if there is no cooldown there will be automatically 1 sec cooldown, so you cannot spam it^^
        if (timestamps.has(message.author.id)) { //if the user is on cooldown
          const expirationTime = timestamps.get(message.author.id) + cooldownAmount; //get the amount of time he needs to wait until he can run the cmd again
          if (now < expirationTime) { //if he is still on cooldonw
            const timeLeft = (expirationTime - now) / 1000; //get the lefttime
            return message.channel.send(new Discord.MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext,ee.footericon)
              .setTitle(`❌ Espere ${timeLeft.toFixed(1)} segundo(s) más antes de reutilizar el comando \`${command.name}\`.`)
            ); //send an information message
          }
        }
        timestamps.set(message.author.id, now); //if he is not on cooldown, set it to the cooldown
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount); //set a timeout function with the cooldown, so it gets deleted later on again
      try{
        //if Command has specific permission return error
        if(command.memberpermissions && !message.member.hasPermission(command.memberpermissions)) {
          return message.channel.send(new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle("❌ error | ¡No tienes permiso para ejecutar este comando!")
            .setDescription(`You need these Permissions: \`${command.memberpermissions.join("`, ``")}\``)
          ).then(msg=>msg.delete({timeout: 5000}).catch(e=>console.log("Couldn't Delete --> Ignore".gray)));
        }
        //if the Bot has not enough permissions return error
        let required_perms = ["ADD_REACTIONS","PRIORITY_SPEAKER","VIEW_CHANNEL","SEND_MESSAGES",
        "EMBED_LINKS","CONNECT","SPEAK","DEAFEN_MEMBERS"]
        if(!message.guild.me.hasPermission(required_perms)){
          try{ message.react("❌"); }catch{}
          return message.channel.send(new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle("❌ error | ¡No tengo suficientes permisos!")
            .setDescription("Dame solo `ADMINISTRADOR`, porque lo necesito para eliminar mensajes, crear canales y ejecutar todos los comandos de administración.\n Si no quieres dármelos, esos son los permisos exactos que necesito.: \n> `" + required_perms.join("`, `") +"`")
          )
        }
        client.stats.inc(message.guild.id, "commands")
        client.stats.inc("global", "commands")
        //run the command with the parameters:  client, message, args, user, text, prefix,
        command.run(client, message, args, message.member, args.join(" "), prefix);
      }catch(e) {
        console.log(String(e.stack).red)
        return message.channel.send(new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle("❌ Algo salió mal mientras se ejecutaba: `" + command.name + "` comando")
          .setDescription(`\`\`\`${e.message}\`\`\``)
        ).then(msg=>msg.delete({timeout: 5000}).catch(e=>console.log("Couldn't Delete --> Ignore".gray)));
      }
    }
    else //if the command is not found send an info msg
    return message.channel.send(new Discord.MessageEmbed()
      .setColor(ee.wrongcolor)
      .setFooter(ee.footertext, ee.footericon)
      .setTitle(`❌ Comando desconocido, intente: **\`${prefix}help\`**`)
      //.setDescription(`Para reproducir música, simplemente escriba \`${prefix}play <Título/Url>\``)
    ).then(msg=>msg.delete({timeout: 5000}).catch(e=>console.log("Couldn't Delete --> Ignore".gray)));
  }catch (e){
    return message.channel.send(
    new MessageEmbed()
    .setColor("RED")
    .setTitle(`❌ ERROR | Ocurrió un error`)
    .setDescription(`\`\`\`${e.stack}\`\`\``)
);
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
}
