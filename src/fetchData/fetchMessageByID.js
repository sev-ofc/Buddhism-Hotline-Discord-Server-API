

    async function asyncForEach(array, callback) {
      for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
      }
    }

async function fetchMessage(bot, config, messageID){

    let OBH = await bot.guilds.get(config.guildID)

    let returnObj = {
      "foundMessage": true
  }
  
    let message


      let validSearchChannels = ["file-sharing", "general", "announcements", "rules", "bot-commands", "starboard", "weekly-submissions", "weekly-challenge"]

let channelArray = await Array.from(OBH.channels.values() )

    await asyncForEach(channelArray, async (channel) => {


        if(validSearchChannels.includes(channel.name)){
          try {
           message = await channel.fetchMessage(messageID)
          }
          catch {
            null;
          }
        }
      })

 
      if(message && message.content){

        let messageDate = message.createdAt
        let formatted = messageDate.toLocaleDateString();

returnObj.content = message.content


let messageA = []

message.attachments.forEach(a => {
  messageA.push(a.url)
})

if(messageA){
  returnObj.messageAttachments = messageA
}
returnObj.messageURL = message.url
returnObj.messageCreatedTimestamp = message.createdTimestamp
returnObj.messageCreatedDate = formatted.toString()
returnObj.messageChannel = {
  "channelName": message.channel.name,
  "channelID": message.channel.id
}
let user = message.author

let tempObj = {}

const date = user.createdAt;
const newDate = date.toLocaleDateString();



tempObj.tag = user.tag
tempObj.username = user.username
tempObj.discriminator = user.discriminator

tempObj.avatarURL = user.avatarURL
tempObj.userIsBot = user.bot
tempObj.createdAt = newDate.toString()

returnObj.messageAuthor = tempObj

        return returnObj
      }
      else {

        returnObj.foundMessage = false
        return returnObj
      }




}

module.exports.getMessage = fetchMessage