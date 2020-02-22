const net = require('net')
const sessions = {}
const [, , port = 8080] = process.argv

const server = net.createServer(socket => {

    socket.on('data', chunk => { // <user> or <user>:<message>
        const alreadyExists = (() => {
            for (const user in sessions)
                if (socket === sessions[user]) {
                    return true
                }
            return false
        })()

        if (!alreadyExists)
            sessions[chunk.toString()] = socket
        else {
            const [user, message] = chunk.toString().split(':')
            const _socket = sessions[user]
            if (_socket) _socket.write(message)
            else socket.write('ERROR user is not online')
        }
    })
})
server.listen(port, () => console.log(`Server started on port ${port}`))

//net => es un modulo que proveé de una comunicación asincrona para el uso de la API basado en streeming para tcp

//net.createServer => crea un servidor que escucha en una IP y un puerto definido por el socket que le envío

//socket => es una variable que se podría llamar de cualquier otra manera. 

//socket.on => abre la escucha

//data => palabra reservada para recibir el mensaje 

//chunk.toString() => es el mensaje que recibo

//socket.end => cierra la escucha

//server.listen('8080') => servidor escuchando en puerto 8080
