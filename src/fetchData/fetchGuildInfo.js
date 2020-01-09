async function getGuildInfo(bot, config){ 

    let OBH = await bot.guilds.get(config.guildID)
    let guildOwner = await bot.fetchUser(OBH.ownerID)


    let guildArrayRoles = await Array.from(OBH.roles.keys())

    let returnObj = {
        "guildName": OBH.name,
        "guildID": OBH.id,
        "guildIconURL": OBH.iconURL,
        "memberCount": OBH.membercount,
        "roles": guildArrayRoles,
        "splashURL": OBH.splashURL
    }

const ownerdate = guildOwner.createdAt;
const ownernewDate = ownerdate.toLocaleDateString();

returnObj.owner.tag = guildOwner.tag
returnObj.owner.userID = guildOwner.id
returnObj.owner.userAvatar = guildOwner.avatarURL
returnObj.owner.userIsBot = guildOwner.bot 
returnObj.owner.permLevel = "owner"
returnObj.owner.permInt = 1
returnObj.owner.userCreatedAt = ownernewDate.toString()


return returnObj

}

module.exports.getGuildInfo = getGuildInfo