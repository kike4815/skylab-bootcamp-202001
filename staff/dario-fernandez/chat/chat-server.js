const net = require('net')

const sessions = {}

const server = net.createServer(socket => {
    socket.on('connect', error => {
        
    })

    socket.on('data', chunk => {
        const alreadyExists = (() => {
            for (const user in sessions)
                if (socket === sessions[user]) {
                    return true
                }

            return false
        })()

        const sender = (() => {
            for(user in sessions) {
                if(sessions[user] === socket) {
                    return user.toString()
                }
            }
        })()

        if(!alreadyExists){
            sessions[chunk.toString().trim()] = socket
            for(let user in sessions) {
                sessions[user].write(`${chunk.toString().trim()} joined the chat`)
            }
        }else {
            const [message, user] = chunk.toString().split('->')

            if(user) {
                const _socket = sessions[user.toString().trim()]
    
                if (_socket) _socket.write(`${sender}: ${message}`)
                else socket.write('ERROR user is not online')
            } else {
                for(users in sessions) {
                    if(sender != users) {
                        sessions[users].write(`GLOBAL => ${sender}: ${message}`)
                    }
                }
            }
        }
    })
})

server.listen(8080)