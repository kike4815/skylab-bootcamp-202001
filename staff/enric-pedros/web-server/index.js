// const http = require('http')
// const fs = require('fs')
// const logger = require('./logger')
const express = require('express')

const app = express()


app.use(express.static('public'))
app.use(express.static('utils'))

app.get('/', (req, res) =>{
   console.log(req)
   console.log(res)
  });
  

app.listen(8000)

// const {argv : [,,port = 8080]} = process

// const server = http.createServer((req, res) => { 
//     logger.info(`request from ${req.connection.remoteAddress}:${req.url}`)
    
//     const main = '/index.html'
//     const rs = fs.createReadStream(`.${req.url === '/'? main : req.url}`)
    
//     if (req.url !== 'favicon.ico'){
//         rs.on('data',body => {
//             res.end(body)
//         })
//         rs.on ('error', error =>{
//             logger.warn(error)
//             res.writeHead(404)
//             res.end('<h1>NOT FOUND<h1>')
//         })
//     }

// })
// logger.info('starting server')

// server.listen(port, () => {
//     logger.info(`server running on port ${port}`)
//     console.log(`running on port ${port}`)
// })