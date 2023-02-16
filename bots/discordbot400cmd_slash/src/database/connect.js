const mongoose = require('mongoose');
const chalk = require('chalk');
const botconfig = require("../../botconfig/config.json");
async function connect() {
    mongoose.connect(botconfig.mongoDB || process.env.MONGO_TOKEN, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    mongoose.connection.once("open", () => {
        console.log(chalk.blue(chalk.bold(`System`)), (chalk.white(`>>`)), chalk.red(`MongoDB`), chalk.green(`is ready!`))
    });
    return;
}

module.exports = connect