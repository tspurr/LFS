const Discord = require('discord.js');
const config  = require('./config.json');
const path    = require("path");
const fs      = require("fs").promises;

// Initalizing the Client
const client = new Discord.Client();
const TOKEN  = config.Token;

// Login the bot
client.login(TOKEN);
client.commands = new Map();
// Binding the config file to the bot to pass around easier
client.config = require('./config.json');

// ####################################################
//                   Command Handler
// ####################################################
(async function registerCommands(dir = "commands"){
    //reads directory/file
    let files = await fs.readdir(path.join(__dirname, dir));

    //Loop through each file in dir
    for(let file of files) {
        let stat = await fs.lstat(path.join(__dirname, dir, file));

        //If the file is a directory
        if (stat.isDirectory())
            await registerCommands(path.join(dir, file));
        else {
            if(file.endsWith(".js")) {
                let cmdName = file.substring(0, file.indexOf(".js"));
                let cmdModule = require(path.join(__dirname, dir, file));
                client.commands.set(cmdName, cmdModule);
            }
        }


    }
})();


// ####################################################
//                   Event Handler
// ####################################################
(async function registerEvents(dir = "events"){
    //reads directory/file
    let files = await fs.readdir(path.join(__dirname, dir));

    //Loop through each file in dir
    for(let file of files) {
        let stat = await fs.lstat(path.join(__dirname, dir, file));

        //If the file is a directory
        if (stat.isDirectory())
            await registerEvents(path.join(dir, file));

        else {
            if(file.endsWith(".js")) {
                let eventName = file.substring(0, file.indexOf(".js"));
                let eventModule = require(path.join(__dirname, dir, file));

                //bind the function listener for later use
                //Pass in client for later use in the listener
                client.on(eventName, eventModule.bind(null, client));
            }
        }


    }
})();