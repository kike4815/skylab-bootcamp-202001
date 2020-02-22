const net = require('net')
const readline = require('readline')

// $ node client <nick> <ip> <port>

const { argv: [, , nick, ip, port] } = process

const socket = net.createConnection({ host: ip, port })

socket.write(nick)

socket.on('data', chunk => {
    console.log(chunk.toString())
})

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

(function ask() {
    rl.question('Send messsage to? ', userMessage => {
        socket.write(userMessage)

        ask()
    })
})()
