async function checkKeys(key){

    let keys = require(`./config.json`)
    
    if(keys.apiKeys.includes(key) || keys.allAccessKeys.includes(key)){
        return true
    }
    else return false

}

async function checkSensitiveKey(key){
    let keys = require(`./config.json`)
    
    if(keys.allAccessKeys.includes(key)){
        return true
    }
    else return false
}

module.exports.checkKey = checkKeys
module.exports.checkSensitiveKey = checkSensitiveKey