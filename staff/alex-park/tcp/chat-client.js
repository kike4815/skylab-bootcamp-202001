const net = require('net')

const { argv: [,, username, message, host, port]} = process

const socket =net.createConnection({host, port})

socket.setEncoding('utf-8')

socket.write(`${username}: ${message}`)