const logger = require('./logger')

module.exports = (req, res, next) => {
    const { method, url, headers, httpVersion, socket } = req

    const rawRequest = `${method} ${url} HTTP/${httpVersion}
${Object.keys(headers).reduce((accum, header) => accum += `${header}: ${headers[header]}\n`, '')}`

    logger.info(`request from ${socket.remoteAddress}:
${rawRequest}`)

    next()
}