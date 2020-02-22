const fs = require('fs')
const moment = require('moment')

function log(level, message) {
    const output = `${level} ${moment().format('Y-MM-DD HH:mm:ss.SSS')} ${message}`

    console.log(output)

    fs.writeFile('./server.log', `${output}\n`, { encoding: 'utf8', flag: 'a' }, error => {
        if (error) console.error(error)
    })
}

module.exports = {
    __debugEnabled__: false,

    setDebugEnabled(enable) {
        this.__debugEnabled__ = enable
    },

    debug(message) { this.__debugEnabled__ && log('DEBUG', message) },

    info(message) { log('INFO', message) },

    warn(message) { log('WARN', message) },

    error(message) { log('ERROR', message) },

    fatal(message) { log('FATAL', message) }
}