const http = require('http')
const logger = require('./logger')
const fs = require('fs')

const { argv: [, , port = 8080] } = process

logger.setDebugEnabled(true)

logger.debug('starting server')

const server = http.createServer((request, response) => {
    logger.info(`request from ${request.remoteAddress}:
${request}`)

debugger

    let path = request.url

    if (path === '/') path += 'index.html'

    path = `.${path}`

    fs.readFile(path, 'utf8', (error, content) => {
        response.setHeader('Content-Type', 'text/html')

        if (error) {
            logger.warn(error)

            response.writeHead(404)

            return response.end(`<h1>Not found</h1>`)
        }

        response.end(content)
    })

    response.on('error', error => logger.error(error))
})

server.listen(port, () => logger.info(`server up and running on port ${port}`))

process.on('SIGINT', () => {
    logger.warn(`server abruptly stopped`)

    setTimeout(() => process.exit(0), 1000)
})