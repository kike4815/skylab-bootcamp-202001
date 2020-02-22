const net = require('net')
const logger = require('./logger')
const fs = require('fs')

const { argv: [, , port = 8080] } = process

logger.setDebugEnabled(true)

logger.debug('starting server')

const server = net.createServer(socket => {
    logger.debug('setting encoding to utf8')
    socket.setEncoding('utf8')

    socket.on('data', request => {
        logger.info(`request from ${socket.remoteAddress}:
${request}`)

        const lines = request.split('\n')
        let [, path] = lines[0].split(' ')

        if (path === '/') path += 'index.html'

        path = `.${path}`

        fs.readFile(path, 'utf8', (error, content) => {
            if (error) {
                logger.warn(error)

                return socket.end(`HTTP/1.1 404 NOT FOUND
Content-Type: text/html

<h1>Not found</h1>`)
            }

            socket.end(`HTTP/1.1 200 OK
Content-Type: text/html

${content}
`)
        })
    })

    socket.on('error', error => logger.error(error))
})

server.listen(port, () => logger.info(`server up and running on port ${port}`))

process.on('SIGINT', () => {
    logger.warn(`server abruptly stopped`)

    setTimeout(() => process.exit(0), 1000)
})