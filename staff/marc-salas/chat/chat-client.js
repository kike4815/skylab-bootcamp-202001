const net = require('net')

const {argv: [,, user, message, host, port]} = process

const socket = net.createConnection({host, port})   

socket.write(`${user}:${message}`)

socket.on('data', chunk =>{
    console.log(chunk.toString())
    let counter = 0
    if (counter === 2){
        counter++
        socket.destroy()
    }
})

