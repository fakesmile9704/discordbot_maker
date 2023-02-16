const fs = require("fs");
const ascii = require("ascii-table");
let table = new ascii("Events");
table.setHeading("Events", "Load status");
const allevents = [];
module.exports = async (client) => {
  try{
    const load_dir = (dir) => {
      const event_files = fs.readdirSync(`./events/${dir}`).filter((file) => file.endsWith(".js"));
      for (const file of event_files){
        const event = require(`../events/${dir}/${file}`)
        let eventName = file.split(".")[0];
        allevents.push(eventName);
        client.on(eventName, event.bind(null, client));
      }
    }
    await ["client", "guild"].forEach(e=>load_dir(e));
    for (let i = 0; i < allevents.length; i++) {
        try {
            table.addRow(allevents[i], "Ready");
        } catch (e) {
            console.log(String(e.stack).red);
        }
    }
    console.log(table.toString().cyan);
    try{
      const stringlength = 69;
      console.log("\n")
      console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.brightGreen)
      console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1+stringlength-` ┃ `.length)+ "┃".bold.brightGreen)
      console.log(`     ┃ `.bold.brightGreen + `Bienvenido a MANEJADOR DE SERVICIOS!`.bold.brightGreen + " ".repeat(-1+stringlength-` ┃ `.length-`Bienvenido a MANEJADOR DE SERVICIOS!`.length)+ "┃".bold.brightGreen)
      console.log(`     ┃ `.bold.brightGreen + `  /-/ By https://teamarcades.xyz /-/`.bold.brightGreen + " ".repeat(-1+stringlength-` ┃ `.length-`  /-/ By https://teamarcades.xyz /-/`.length)+ "┃".bold.brightGreen)
      console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1+stringlength-` ┃ `.length)+ "┃".bold.brightGreen)
      console.log(`     ┃ `.bold.brightGreen + `  /-/ Discord: k4itrun#7101 /-/`.bold.brightGreen + " ".repeat(-1+stringlength-` ┃ `.length-`  /-/ By Discord: k4itrun#7101 /-/`.length)+ "   ┃".bold.brightGreen)
      console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1+stringlength-` ┃ `.length)+ "┃".bold.brightGreen)
      console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.brightGreen)
    }catch{ /* */ }
    try{
      const stringlength2 = 69;
      console.log("\n")
      console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.yellow)
      console.log(`     ┃ `.bold.yellow + " ".repeat(-1+stringlength2-` ┃ `.length)+ "┃".bold.yellow)
      console.log(`     ┃ `.bold.yellow + `Iniciando sesión en el BOT...`.bold.yellow + " ".repeat(-1+stringlength2-` ┃ `.length-`Iniciando sesión en el BOT...`.length)+ "┃".bold.yellow)
      console.log(`     ┃ `.bold.yellow + " ".repeat(-1+stringlength2-` ┃ `.length)+ "┃".bold.yellow)
      console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.yellow)
    }catch{ /* */ }
  }catch (e){
    console.log(String(e.stack).bgRed)
  }
};
/** Coded by Team Arcades **/
