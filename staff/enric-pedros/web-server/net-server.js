
const net = require('net')
const fs = require('fs')
const server = net.createServer(socket => {
    socket.setEncoding('utf8')
    socket.on('data', chunk => {
        let url = chunk.split('/')[1].split(' ')
        console.log(url)
        // const rs = fs.createReadStream('./index.html')
        // rs.on('data', content => {
        //     socket.end(`HTTP/1.1 200 OK\nServer: Cowboy\nAccess-Control-Allow-Origin:\nContent-Type: text/html\n\n${content}\n`)
        //socket.end('HTTP/1.1 200 OK\n')
 
    })
})

server.listen(8080)
