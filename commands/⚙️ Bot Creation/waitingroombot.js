const { MessageEmbed, MessageAttachment, Client } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const fse = require('fs-extra');
const fs = require('fs');
var archiver = require('archiver');
module.exports = {
    name: "waitingroombot",
    category: "⚙️ Bot Creation",
    aliases: ["createwaitingroombot", "waitingroom", "createwaitingroom"],
    cooldown: 60,
    usage: "waitingroombot",
    description: "Un Bot de sala de espera es perfecto para configurar un canal de radio **24/7** o para una **sala de espera** real",
    commands: ["help", "ping", "uptime", "changeradio", "join", "leave", "play", "rejoin", "setup"],
    run: async (client, message, args, user, text, prefix) => {
    try{
      client.stats.inc(message.guild.id, "Bots")
      client.stats.inc("global", "Bots")
      client.stats.inc(message.guild.id, "waitingroombot")
      client.stats.inc("global", "waitingroombot")
      client.stats.inc(message.guild.id, "commands")
      client.stats.inc("global", "commands")
      let approvalmsg = await message.author.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`¿Tiene node.js 18.0.0 **__O__** superior?`)
        .setURL("https://nodejs.org/en/")
        .setDescription("Si es así, ¡reacciona con ✅ para continuar! ¡Si no lo tiene instalado, entonces su Bot NO FUNCIONARÁ!\n*También tiene [python](https://www.python.org/downloads/) y [ffmpeg](http://ffmpeg.org/download.html) siempre es muy bueno!*")
      )
      approvalmsg.react("✅")
      message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setURL(approvalmsg.url)
        .setTitle(`¡Revise sus \`mensajes directos\` para la Creación!`)
      )
      let error = false;
      await approvalmsg.awaitReactions((reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id, { max: 1, time: 60000, errors: ['time'] })
    	.then(collected => console.log(`APPROVED: ${message.author.tag}`))
    	.catch(e => {
        console.log(String(e.stack).bgRed)
        message.author.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`❌ ERROR | CANCELADO, no reaccionaste a tiempo!`)
        );
        error = true;
    	});
      if(error) return;

      let token, prefix,  owner = message.author.id, author = message.author;
      author.send(
        new MessageEmbed()
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`¡Ingrese un token de bot!`)
          .setDescription(`¡Tiene 180 segundos de tiempo!\n\nVaya a: https://discord.com/developers\n**-->** Cree una aplicación\n**-->** Cree un bot bajo \`BOT \` - Pestaña\n**-->** ¡Copia el token y envíamelo!\n\n*** ¡Puedes configurar el avatar y el nombre e invitarlo a tu gremio más tarde! ***`)
      ).then(msg => {
        msg.channel.awaitMessages(m=>m.author.id === author.id, { max: 1, time: 180000, errors: ['time'] })
        .then(async collected => {
            token = collected.first().content;
            if(token.length != "MTA0NTQ1MTUyNzU1MDE0MDQ5Ng.GhY216.Ab4BuqHZW3HRhm6TzkIcP-09AcwS78Z75SMHQc".length)
              author.send(new MessageEmbed()
                .setFooter(ee.footertext,ee.footericon)
                .setColor(ee.wrongcolor)
                .setTitle("¡Eso no es un token válido! Por favor, intenta de nuevo")
              )
            let workingtoken = await checktoken(token);
            if(!workingtoken)
              author.send(new MessageEmbed()
                .setFooter(ee.footertext,ee.footericon)
                .setColor(ee.wrongcolor)
                .setTitle("¡Eso no es un token válido! Por favor, intenta de nuevo")
                .setDescription(`¡Aunque la Longitud es correcta, el Token no funciona! ¡LO PROBÉ!`)
              )
                author.send(
                  new MessageEmbed()
                    .setColor(ee.color)
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle(`¡Tiene 180 segundos de tiempo!\n\nPor favor, introduzca un PREFIJO de Bot.`)
                    .setDescription(`En su lugar, siempre puede hacer ping a su Bot, pero establezca un Prefijo predeterminado como: \`p!\`\n\n*¡Un Prefijo es la letra/cosa que siempre se encuentra frente a un Comando!*`)
                ).then(msg=>{
                  msg.channel.awaitMessages(m=>m.author.id === author.id, { max: 1, time: 180000, errors: ['time'] })
                  .then(collected => {
                    prefix = collected.first().content;
                    let waitingroombotconfig = require("../../bots/waitingroombot/botconfig/config.json")
                    let oldconfig = waitingroombotconfig;
                    oldconfig.token = token;
                    oldconfig.prefix = prefix;
                    oldconfig.owner = owner;
                    fs.writeFile("./bots/waitingroombot/botconfig/config.json", JSON.stringify(oldconfig, null, 3), async (e) => {
                      if (e) {
                        console.log(String(e.stack).red);
                        author.send(new MessageEmbed()
                          .setFooter(ee.footertext,ee.footericon)
                          .setColor(ee.wrongcolor)
                          .setTitle("❌ ERROR al escribir el archivo")
                          .setDescription(`\`\`\`${e.message}\`\`\``)
                        )
                      }
                      let tempmsg = await author.send(new MessageEmbed()
                        .setColor(ee.color)
                        .setFooter(client.user.username, client.user.displayAvatarURL())
                        .setAuthor(`Parámetros modificados... | Enviando tu Bot...`, "https://cdn.discordapp.com/emojis/937126702000275477.gif")
                      )
                      const srcDir = `./bots/waitingroombot/`;
                      const destDir = './waitingroombot.zip'
                      var output = fs.createWriteStream(destDir);
                      var archive = archiver('zip');
                      output.on('close', function () {
                        setTimeout(()=>{
                          const attachment = new MessageAttachment(destDir);
                          author.send(attachment)
                          tempmsg.edit(new MessageEmbed()
                            .setColor(ee.color)
                            .setFooter(client.user.username, client.user.displayAvatarURL())
                            .setTitle(`¿Cómo usar el Bot?`)
                            .setDescription(`1. Descargue el archivo ZIP\n2. Extraiga el ARCHIVO ZIP en una CARPETA\n3. ¡abra una nueva TERMINAL (cmd/powershell) en este Directorio!\n4. escriba: \`npm install\` para instalar todo paquetes necesarios (discord.js @discordjs/opus ascii-table colors)\\n5. Después de eso, escriba \`node index.js\` y su Bot comenzará.\n\n\nAhora invite a su Bot a su servidor deseado, y escribe \`${prefix}join\` ¡Entonces tu Bot se unirá a tu canal y lo guardará como Sala de espera!\nSiempre puedes restablecer eso con \`join\` / \`setup\`\nPuedes cambiar la estación de radio escribiendo: \`${prefix}changeradio\`, ¡pero asegúrese de que sea un enlace de estación mp3 válido!\n\nPara ver todos los demás comandos disponibles, escriba: \`${prefix}help\`\n*Tenga en cuenta que este Bot ¡solo funciona en un gremio a la vez! *\n\nTambién cambia los colores **Embed** en \`/botconfig/embed.json\``)
                           )
                          setTimeout(()=>{
                            try {
                              fs.unlinkSync(destDir)
                            } catch(e) {
                            }
                            oldconfig = waitingroombotconfig;
                            oldconfig.token = "";
                            oldconfig.prefix = "";
                            oldconfig.owner = "";
                            fs.writeFile("./bots/waitingroombot/botconfig/config.json", JSON.stringify(oldconfig, null, 3), async (e) => {
                              if (e) {
                                console.log("couldnt reset waitingroombot")
                              }
                              console.log("resetted waitingroombot")
                            })
                            return;
                          }, 1000)
                        }, 1000)
                      });
                      archive.on('error', function(e){
                        console.log(String(e.stack).red);
                        author.send(new MessageEmbed()
                          .setFooter(ee.footertext,ee.footericon)
                          .setColor(ee.wrongcolor)
                          .setTitle("❌ ERROR Creando Zip")
                          .setDescription(`\`\`\`${e.message}\`\`\``)
                        )
                      });
                      archive.pipe(output);
                      // append files from a sub-directory, putting its contents at the root of archive
                      archive.directory(srcDir, false);
                      // append files from a sub-directory and naming it `new-subdir` within the archive
                      archive.directory('subdir/', 'new-subdir');
                      archive.finalize();
                    })
                  }).catch(e => {
                    console.log(String(e.stack).bgRed)
                    author.send(new MessageEmbed()
                        .setColor(ee.wrongcolor)
                        .setFooter(ee.footertext, ee.footericon)
                        .setTitle(`❌ ERROR | Ocurrió un error`)
                        .setDescription(`\`\`\`${e.message}\`\`\``)
                    );
                  })
                }).catch(e => {
                  console.log(String(e.stack).bgRed)
                  author.send(new MessageEmbed()
                      .setColor(ee.wrongcolor)
                      .setFooter(ee.footertext, ee.footericon)
                      .setTitle(`❌ ERROR | Ocurrió un error`)
                      .setDescription(`\`\`\`${e.message}\`\`\``)
                  );
                })
              })
        .catch(e => {
              console.log(String(e.stack).bgRed)
              author.send(new MessageEmbed()
                  .setColor(ee.wrongcolor)
                  .setFooter(ee.footertext, ee.footericon)
                  .setTitle(`❌ ERROR | Ocurrió un error`)
                  .setDescription(`\`\`\`${e.message}\`\`\``)
              );
              error = true;
            });
            if(error) return;
      }).catch(e => {
                console.log(String(e.stack).bgRed)
                return message.channel.send(new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle(`❌ ERROR | Ocurrió un error`)
                    .setDescription(`\`\`\`${e.message}\`\`\`*Habilite su DMS*`)
                );
                error = true;
              });
              if(error) return;

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
async function checktoken(token){
  let testclient = new Client();
  try{
    await testclient.login(token)
    testclient.on("ready", () => testclient.destroy() )
    return true;
  } catch {
    console.log("INVALID TOKEN")
    return false;
  }
}
/** Coded by Team Arcades **/
