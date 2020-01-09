async function getBans(bot, config){


    
    let OBH = await bot.guilds.get(config.guildID)


    let returnObj = {
        "banlist": []
    }

    await OBH.fetchBans(true).then( async (banlist) => {



banlist.forEach( async (r) => {

    let reason = r.reason
    let user = r.user

    let tempObj = {
        "userID": user.id,
        "userName": user.username,
        "userDiscriminator": user.discriminator.toString(),
        "avatarUrl": user.avatarURL,    
        "userTag": `${user.username}#${user.discriminator}`,
        "userIsBot": user.bot
    }
    if(reason){
        tempObj.reason = reason
    }
    else {
        tempObj.reason = false
    }


    returnObj.banlist.push(tempObj)


})






    })



    return returnObj

}

module.exports.getBans = getBans