const net = require('net')
const readline = require('readline');


const { argv: [, , userName, host, port] } = process

const socket = net.createConnection({ host, port })

socket.write(userName)

socket.on('data', chunk => {
    console.log(chunk.toString())


})
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

(function ask() {
    let prompt = 'Write <username to send to> : <message> >> ';
    rl.question(prompt, userMessage => {

        socket.write(userMessage + '\n')

        ask()
    });

})()




