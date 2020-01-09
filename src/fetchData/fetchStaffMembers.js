async function fetchStaff(bot, config){



    

    let returnObj = {
        "staffMembers": [],
        "guildBots": [],
        "owner": {

        }
    }
    
    
    
        let OBH = await bot.guilds.get(config.guildID)

        
let guildOwner = await bot.fetchUser(OBH.ownerID)


    
const ownerdate = guildOwner.createdAt;
const ownernewDate = ownerdate.toLocaleDateString();

returnObj.owner.tag = guildOwner.tag
returnObj.owner.userID = guildOwner.id
returnObj.owner.userAvatar = guildOwner.avatarURL
returnObj.owner.userIsBot = guildOwner.bot 
returnObj.owner.permLevel = "owner"
returnObj.owner.permInt = 1
returnObj.owner.userCreatedAt = ownernewDate.toString()


    
    
    let staffMemberCollection = await OBH.members.filter(member => member.hasPermission(`MANAGE_MESSAGES`))
    
    let staffMembers = await Array.from( staffMemberCollection.keys() )


    staffMembers.forEach(async staffMember => {

    let tempObj = {}
    
    
    let member = await OBH.members.get(staffMember)
    
    let user = member.user
    
    
    const date = user.createdAt;
    const newDate = date.toLocaleDateString();
    
if(OBH.ownerID == user.id) return;
    
    tempObj.tag = user.tag
    tempObj.userID = user.id
    if(member.nickname){
    tempObj.userGuildNickname = member.nickname 
    }
    else {
        tempObj.userGuildNickname = false
    }
    tempObj.userAvatar = user.avatarURL
    tempObj.userIsBot = user.bot 

    
 if(member.user.bot){
    tempObj.permLevel = "bot"
    tempObj.permInt = 6
}
    else if(member.hasPermission("ADMINISTRATOR")){
        tempObj.permLevel = "administrator"
        tempObj.permInt = 2
    }
    else if(member.hasPermission("BAN_MEMBERS")){
        tempObj.permLevel = "moderator"
        tempObj.permInt = 3
    }
    else if(member.hasPermission("MANAGE_MESSAGES") && member.roles.has("478825657569247242")){
        tempObj.permLevel = "helper"
        tempObj.permInt = 4
    }
    else if(member.hasPermission("MANAGE_MESSAGES") && member.roles.has("452949663512002561")){
        tempObj.permLevel = "botdev"
        tempObj.permInt = 5
    }
    tempObj.userCreatedAt = newDate.toString()
    
    
    if(user.bot){
        returnObj.guildBots.push(tempObj)
    }
    else {
    returnObj.staffMembers.push(tempObj)
    }
    
    
    })
    
    
    
    
    
    
    
    return returnObj
    
    
    }


module.exports.getStaff = fetchStaff