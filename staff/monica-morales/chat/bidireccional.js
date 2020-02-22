
// Server Manu
​
​
// const net = require('net')
// const server = net.createServer(socket =>{
//     socket.on('data', chunk =>{
        
//         console.log(chunk.toString())
        
//     })
// })
// server.listen(9000)
// console.log('running at port nc9000')
​
​
​
// Server Carlos 1
​
// var net = require('net')
// var sockets = []
// var server = net.createServer(socket =>{
//     sockets.push(socket)
//     socket.on('end', () =>{
//         var i =sockets.indexOf(socket);
//         sockets.splice(i, 1);
//     });
​
//     socket.on('data', function(msg){
//         for (var i = 0; i < sockets.length; i++) {
//             if(sockets[i] !== socket){
//                 sockets[i].write('->' + msg);
//             }
            
//         }
//     });
// })
// server.listen(9000);
​
​
​
​
// Server Pepino pepino
​
// Load the TCP Library
net = require('net');
​
// Keep track of the chat clients
var clients = [];
​
// Start a TCP Server
net.createServer(function (socket) {
​
  // Identify this client
  socket.name = socket.remoteAddress + ":" + socket.remotePort 
​
  // Put this new client in the list
  clients.push(socket);
​
  // Send a nice welcome message and announce
  socket.write("Welcome " + socket.name + "\n");
  broadcast(socket.name + " joined the chat\n", socket);
​
  // Handle incoming messages from clients.
  socket.on('data', function (data) {
    broadcast(socket.name + "> " + data, socket);
  });
​
  // Remove the client from the list when it leaves
  socket.on('end', function () {
    clients.splice(clients.indexOf(socket), 1);
    broadcast(socket.name + " left the chat.\n");
  });
  
  // Send a message to all clients
  function broadcast(message, sender) {
    clients.forEach(function (client) {
      // Don't want to send it to sender
      if (client === sender) return;
      client.write(message);
    });
    // Log it to the server output too
    process.stdout.write(message)
  }
​
}).listen(9000);
​
// Put a friendly message on the terminal of the server.
console.log("Chat server running at port 9000\n");
Contraer



