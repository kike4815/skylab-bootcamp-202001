
const net = require('net')
const fs = require('fs')
const logger = require('./logger')
logger.info('starting server')

const server = net.createServer(socket => {
    logger.debug('setting encoding to utf8')
    
    console.log('server started')
    socket.on('data', chunk => {
        logger.info(`request received ${chunk} from ${socket.remoteAddress}`)
        
        let data = chunk.toString('utf-8')
        const headers = data.split('\n')
        let path = headers[0].split('/')[1].split(' ')[0]
       
        console.log(path.toString())
        console.log(headers)
        
        if(!path) path = 'index.html'
        if(path !== 'favico.ico'){
            const rs = fs.createReadStream(`./${path}`)
            rs.on('data', content => {
                console.log(content)
                socket.end(`HTTP/1.1 200 OK\nServer: Cowboy\nAccess-Control-Allow-Origin: \nContent-Type: text/html\n\n${content.toString()}\n`) 
            })
            rs.on('error', error => {     
                logger.error(error)
                socket.end(`HTTP/1.1 404 Not found`)
            })
        }
    })
})
server.listen(8080)