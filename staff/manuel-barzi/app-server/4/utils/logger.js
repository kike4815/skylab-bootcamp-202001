const fs = require('fs')
const moment = require('moment')

const LEVELS = ['DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL']

let ws

const logger = {
    __level__: this.DEBUG,
    __path__: undefined,

    __log__(level, message) {
        if (level >= this.__level__) {
            const output = `${LEVELS[level]} ${moment().format('Y-MM-DD HH:mm:ss.SSS')} ${message}`

            console.log(output)

            // fs.writeFile(this.__logFile__, `${output}\n`, { encoding: 'utf8', flag: 'a' }, error => {
            //     if (error) console.error(error)
            // })

            if (!ws) ws = fs.createWriteStream(this.__path__, { flags: 'a' })

            ws.write(`${output}\n`)
        }
    },

    set level(level) {
        this.__level__ = level
    },

    set path(path) {
        this.__path__ = path
    },

    debug(message) { this.__log__(this.DEBUG, message) },

    info(message) { this.__log__(this.INFO, message) },

    warn(message) { this.__log__(this.WARN, message) },

    error(message) { this.__log__(this.ERROR, message) },

    fatal(message) { this.__log__(this.FATAL, message) }
}

LEVELS.forEach((LEVEL, index) => logger[LEVEL] = index)

module.exports = logger