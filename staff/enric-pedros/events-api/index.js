require('dotenv').config

const express = require('express')
const winston = require('winston')
const bodyParser = require('body-parser')
const { registerUser, authenticateUser, retrieveUser } = require('./routes')
const jsonBodyParser = bodyParser.json()


const logger = winston.createLogger({
    level: env === 'development' ? 'debug' : 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'server.log' })
    ]
})

const app = express()

app.post('/users',jsonBodyParser,registerUser)

app.post('/users/auth', jsonBodyParser, authenticateUser)

app.get('/users', retrieveUser)

app.listen(port, () => logger.info(`server ${name} ${version} is running on port ${port} `))