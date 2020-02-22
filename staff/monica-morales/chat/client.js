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

//net => es un modulo que proveé de una comunicación asincrona 

// { argv: [, , message, host ,port]} => los argumentos que tengo que pasar por consola

// net.createConnection({host, port}) => creo una conexion hacia ese host(ip) y puerto que recibo por process

//socket.write(message) => para enviar el mensaje