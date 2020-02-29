const net = require('net')

const sessions = {}
const port = 8080

const server = net.createServer( socket => {

	socket.on('data', chunk => {
        
   })
})
server.listen(port, () => {
   console.log(`listening to server on port: ${port}!`)
})