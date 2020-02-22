const net = require('net')
const clients = {}

const server = net.createServer(socket => {
    socket.on('data', chunk => {

        const alreadyExists = (() => {
            for (const user in clients) {
                if (socket === clients[user])
                    return true
            }

            return false
        })();

        if (!alreadyExists) {
            clients[chunk.toString()] = socket
        } else {
            const [user, message] = chunk.toString().split(':')

            const _socket = clients[user]

            if (_socket) _socket.write(message)
            else socket.write('Error, user is not online')
        }
    })
})

server.listen(8080)
