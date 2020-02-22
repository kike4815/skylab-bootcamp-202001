const net = require('net');

const clients = {}

const server = net.createServer( socket => {
    socket.on('data', chunk=>{
        
        let user = chunk.toString().split(":")[0]
        
        clients[user] = socket
        
        console.log(chunk.toString())

        for (user in clients){
            clients[user].write(`${chunk.toString()}`)
        }

        //socket.end('message sended')
    })  

})

server.listen(8080)