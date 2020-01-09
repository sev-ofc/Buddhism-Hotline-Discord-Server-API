async function fetchRules(bot, config){

    let OBH = await bot.guilds.get(config.guildID)

let channel = await OBH.channels.find(c => c.name == "rules")
let rulesMessageID = "551518193747755008"



let rulesMessage = await channel.fetchMessage(rulesMessageID)


let returnObj = {
    "rules": rulesMessage.content,
    "authorTag": rulesMessage.author.tag,
    "authorID": rulesMessage.author.id
}


return returnObj
}

module.exports.getRules = fetchRules