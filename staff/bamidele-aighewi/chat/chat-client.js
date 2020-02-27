const net = require('net')

const { argv: [, , message, host, port] } = process

const socket = net.connect({ host, port })

socket.write(message)
socket.end()