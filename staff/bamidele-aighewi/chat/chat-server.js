/**
 * 
 */

const chatServer = () => {
    if (typeof require !== 'function') throw new TypeError('require is not a function')

    // let's instantiate net [object Object]
    const net = require('net')
    if (typeof net !== 'object') throw new TypeError('net is not an object')

    const server = net.createServer(socket => {
        socket.on('data', chunk => {
            console.log(chunk.toString())
            // socket.end('OK')
        })
    })
    server.listen(8080)

    server.on('listening', () => {
        console.log('Server is listening!')
    })

    server.on('error', (error) => {
        if (error) throw new error
    })
}

chatServer()

// server.on('close', (error)=>{
//     var bread = socket.bytesRead;
//     var bwrite = socket.bytesWritten;
//     console.log('Bytes read : ' + bread);
//     console.log('Bytes written : ' + bwrite);
//     console.log('Socket closed!');
//     if (error) {
//         console.log('Socket was closed coz of transmission error');
//     }
// })

// socket.on('end', (data)=>{
//     console.log('Socket ended from other end!');
//     console.log('End data : ' + data);
// })