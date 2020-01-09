async function getUserInfo(bot, config, userID){

    let tempObj  = {}

    try {
    let user = await bot.fetchUser(userID)

    const date = user.createdAt;
    const newDate = date.toLocaleDateString();



    tempObj.tag = user.tag
    tempObj.username = user.username
    tempObj.discriminator = user.discriminator
    tempObj.userID = user.id
    tempObj.avatarURL = user.avatarURL
    tempObj.userIsBot = user.bot
    tempObj.createdAt = newDate.toString()

    return tempObj

    }
    catch {
        return false
    }

}

module.exports.getUserInfo = getUserInfo