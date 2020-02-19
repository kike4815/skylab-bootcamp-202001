const fs = require('fs')

const logger = {
__write__(level,message){
    fs.appendFile('server.log',`${level}:${message}\n`,()=>{console.error})
},
info(message){
    this.__write__('info',message)
},
debug(message){
    this.__write__('debug',message)
},
warn(message){
    this.__write__('warn',message)
},
fatal(message){
    this.__write__('fatal',message)
}


}
module.exports = logger