const express = require('express')
const fs = require('fs')
const app = express();
const bodyParser = require('body-parser')
const rateLimit = require("express-rate-limit");


let config = require(`./config.json`)

const Discord = require(`discord.js`)


const bot = new Discord.Client();


//Importing files


//Setting API rate limiter
app.set('trust proxy', 1);

let limitRate = config.apiRateLimit

const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minute
	max: parseInt(config.apiRateLimit)
});
 
//  apply to all requests
app.use(limiter);

app.use(bodyParser.json());       // to support JSON-encoded bodies


let checker = require(`./checkApiKeys`)

let badKeyObj = {
    "ERROR": "INVALID/BAD KEYS"
}


let badHighKeyObj = {
    "ERROR": "INVALID/IMPROPER PERM KEYS - THIS API ROUTE USES HIGHER SECURITY KEYS"
}




bot.on("error", async function(error){
  return console.log(`The Discord bot client has encountered a websocket error! The error is: ${error.name} (Stack: ${error.stack})`);
});

bot.on("reconnecting", async function(){
  return console.log(`The Discord bot client is attempting to reconnect to discord!`);
});

bot.on("resume", async function(replayed){
  return console.log(`The Discord bot client has reconnected! Replays: ${replayed}`);
});


bot.on("ready", async () => {

    
app.post("/bhApi/getStaff", async (req , res) =>{


    if(!req.body.apikey){
        res.send(badKeyObj)
        return;
    }
    if(!await checker.checkKey(req.body.apikey)) {
        res.send(badKeyObj)
        return;
    }

    let staffModule = require(`./fetchData/fetchStaffMembers`)

let resp = await staffModule.getStaff(bot, config)


res.send(resp)

});


app.post("/bhApi/getBans", async (req , res) =>{

    
    if(!req.body.apikey){
        res.send(badKeyObj)
        return;
    }
    if(!await checker.checkSensitiveKey(req.body.apikey)) {
        res.send(badHighKeyObj)
        return;
    }

    
    let banModule = require(`./fetchData/fetchBanList`)

    let banListObj = await banModule.getBans(bot, config)

    res.send(banListObj)



});


app.post("/bhApi/getUsersByName", async (req , res) =>{

    if(!req.body.apikey){
        res.send(badKeyObj)
        return;
    }
    if(!await checker.checkKey(req.body.apikey)) {
        res.send(badKeyObj)
        return;
    }


    let user = req.body.user

    let getUserModule = require(`./fetchData/fetchMemberByUsername`)


    let respObj = await getUserModule.getUsers(bot, config, user)

    res.send(respObj)
});

app.post("/bhApi/getUser", async (req , res) =>{

    if(!req.body.apikey){
        res.send(badKeyObj)
        return;
    }
    if(!await checker.checkKey(req.body.apikey)) {
        res.send(badKeyObj)
        return;
    }


    let user = req.body.user

    let getUserModule = require(`./fetchData/getUserInfo`)


    let respObj = await getUserModule.getUserInfo(bot, config, user)

    if(!respObj){

        return res.send({"ERROR": "INVALID USER ID/BOT COULD NOT FETCH THAT USER"})
    }
    else res.send(respObj)
});

app.post("/bhApi/getRules", async (req , res) =>{

    if(!req.body.apikey){
        res.send(badKeyObj)
        return;
    }
    if(!await checker.checkKey(req.body.apikey)) {
        res.send(badKeyObj)
        return;
    }


    let getRulesModule = require(`./fetchData/fetchRules`)


    let respObj = await getRulesModule.getRules(bot, config)
    
    res.send(respObj)
});

app.post("/bhApi/getMessage", async (req , res) =>{

    if(!req.body.apikey){
        res.send(badKeyObj)
        return;
    }
    if(!await checker.checkKey(req.body.apikey)) {
        res.send(badKeyObj)
        return;
    }


    let getMessageModule = require(`./fetchData/fetchMessageByID`)


    let respObj = await getMessageModule.getMessage(bot, config, req.body.messageID)
    
    res.send(respObj)
});

app.post("/bhApi/getStaffMessage", async (req , res) =>{
   
    if(!req.body.apikey){
        res.send(badKeyObj)
        return;
    }
    if(!await checker.checkSensitiveKey(req.body.apikey)) {
        res.send(badHighKeyObj)
        return;
    }



    let getMessageModule = require(`./fetchData/fetchStaffMessageByID`)


    let respObj = await getMessageModule.getMessage(bot, config, req.body.messageID)
    
    res.send(respObj)
});

app.post("/bhApi/sendMessageToChannel", async (req , res) =>{
   
    if(!req.body.apikey){
        res.send(badKeyObj)
        return;
    }
    if(!await checker.checkSensitiveKey(req.body.apikey)) {
        res.send(badHighKeyObj)
        return;
    }



    let sendMessageModule = require(`./actions/sendToChannel`)


    let respObj = await sendMessageModule.remoteSendToChannel(bot, config, req.body.channelID, req.body.message)
    
    res.send({
        "actionDone": respObj
    })
    
});




app.post("/bhApi/getGuildInfo", async (req , res) =>{

    if(!req.body.apikey){
        res.send(badKeyObj)
        return;
    }
    if(!await checker.checkKey(req.body.apikey)) {
        res.send(badKeyObj)
        return;
    }

    let guildInfoModule = require(`./fetchData/fetchGuildInfo`)

    let respObj = await guildInfoModule.getGuildInfo(bot, config)

    res.send(respObj)

});


})
bot.login(config.botToken)


module.exports = app