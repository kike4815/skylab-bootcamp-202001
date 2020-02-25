const net = require('net')
const readline = require('readline')

const { argv: [, , nick] } = process

const socket = net.createConnection({ host: '192.168.0.16', port: '8080' })

socket.write(nick)

socket.on('connect', error => {
    if(error) {
        console.log('Connection error. Please contact with your chat provider or shout "Esta mier*a no tira" and someone will help you.')
    } else {
        console.log('Welcome to awesomeChat. Just write and press "Enter" to send a message globaly. use "Hello -> user" to send a message to an online unser. Enjoy!')
    }
})

socket.on('data', chunk => {
    console.log('\n' + chunk.toString())
})

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

(function ask() {
    rl.question('~', userMessage => {
        socket.write(userMessage)

        ask()
    })
})()