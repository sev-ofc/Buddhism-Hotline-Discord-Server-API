const http = require('http')


let config = require(`./config.json`)

const port = config.port || process.env.PORT || 25568;

const app = require('./app')
const server = http.createServer(app);


const Discord = require("discord.js")
const fs = require("fs")


    
    console.log(`BH API Started!`)
    console.log(`Now listening on port ${port}`)
    server.listen(port);


