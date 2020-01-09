async function getMemberByUser(bot, config, username){

    let OBH = await bot.guilds.get(config.guildID)


    let newMemberCollection = await OBH.members.filter(member => member.user.tag.toLowerCase().includes(username.toLowerCase()))


    let fittingMembers = await Array.from( newMemberCollection.keys() )

    let returnObj = {
        "fittingUsers": []
    }


    async function asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
          await callback(array[index], index, array);
        }
      }

      await asyncForEach(fittingMembers, async (memberID) => {
        

        let tempObj = {}

        let user = await bot.fetchUser(memberID)
        let member = await OBH.members.get(memberID)

        const date = user.createdAt;
        const newDate = date.toLocaleDateString();



        tempObj.tag = user.tag
        tempObj.username = user.username
        tempObj.discriminator = user.discriminator
        tempObj.userID = user.id

        if(member.nickname){
            tempObj.userGuildNickname = member.nickname 
            }
            else {
                tempObj.userGuildNickname = false
            }
        tempObj.avatarURL = user.avatarURL
        tempObj.userIsBot = user.bot
        tempObj.createdAt = newDate.toString()


        if(OBH.ownerID == user.id){
    
            tempObj.permLevel = "owner"
            tempObj.permInt = 1
        
        }
        else if(user.bot){
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
            else {
                tempObj.permLevel = "default"
                tempObj.permInt = 7
            }


            
            await returnObj.fittingUsers.push(tempObj)  
      })

      /*
 fittingMembers.forEach(async memberID => {

        let tempObj = {}

        let user = await bot.fetchUser(memberID)
        let member = await OBH.members.get(memberID)

        const date = user.createdAt;
        const newDate = date.toLocaleDateString();



        tempObj.tag = user.tag
        tempObj.username = user.username
        tempObj.discriminator = user.discriminator
        if(member.nickname){
            tempObj.userGuildNickname = member.nickname 
            }
            else {
                tempObj.userGuildNickname = false
            }
        tempObj.avatarURL = user.avatarURL
        tempObj.userIsBot = user.bot
        tempObj.createdAt = newDate.toString()


        if(OBH.ownerID == user.id){
    
            tempObj.permLevel = "owner"
            tempObj.permInt = 1
        
        }
        else if(user.bot){
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
            else {
                tempObj.permLevel = "default"
                tempObj.permInt = 7
            }


            
            await returnObj.fittingUsers.push(tempObj)

    })

*/
    if(returnObj.fittingUsers.length > 0){
    return returnObj
    }
    else {
        returnObj.fittingUsers = false
        return returnObj
    }



}

module.exports.getUsers = getMemberByUser