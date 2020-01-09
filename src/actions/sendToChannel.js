async function sendToChannel(bot, config, channelID, stringToSend){

    try{

    let channeltoSend = await bot.channels.get(channelID)


if(stringToSend.toLowerCase().includes("@everyone") || stringToSend.toLowerCase().includes("@here")){
return false
}

    await channeltoSend.send(stringToSend)

        return true
    }
    catch {
        return false
    }

}

module.exports.remoteSendToChannel = sendToChannel