const net = require('net')

const sessions = {}

const server = net.createServer(socket => {
    socket.on('data', chunk => { // <user> or <user>:<message>
        const alreadyExists = (() => {
            for (const user in sessions)
                if (socket === sessions[user]) {
                    return true
                }

            return false
        })()

        debugger

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

server.listen(8080)