const net = require('net')
const { argv: [, , message, ip ,port]} = process
const socket =net.createConnection({host: ip, port})
socket.write(message.toString())