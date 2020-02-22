// const net = require('net')

// // $ node chat-client <message> <ip> <port>

// const { argv: [, , message, ip, port] } = process

// const socket = net.createConnection({ host: ip, port })

// socket.write(message)

const net = require('net')
const readline = require('readline')

// $ node client <nick> <ip> <port>

const { argv: [, , nick, ip, port] } = process

const socket = net.createConnection({ host: ip, port })

socket.write(nick)

socket.on('data', chunk => {
    socket.write(chunk.toString())
})

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

(function ask() {
    rl.question('Send message to? ', userMessage => {
        socket.write(userMessage)

        ask()
    })
})()
