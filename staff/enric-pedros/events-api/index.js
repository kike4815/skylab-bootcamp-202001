require('dotenv').config()

const { env: { PORT = 8080, NODE_ENV: env, MONGODB_URL }, argv: [, , port = PORT] } = process

const cors = require('cors')
const express = require('express')
const winston = require('winston')
const { registerUser, authenticateUser, retrieveUser, createEvent, retrieveUserEvents, retrieveLastUserEvents, suscribe, suscribedEvents, updateEvent, deleteEvent} = require('./routes')
const { name, version } = require('./package')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')
const { tokenParse, jwtVerifierMidWare } = require('events-utils')
const {mongoose} = require('events-data')

mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        const logger = winston.createLogger({
            level: env === 'development' ? 'debug' : 'info',
            format: winston.format.json(),
            transports: [
                new winston.transports.File({ filename: 'server.log' })
            ]
        })

        if (env !== 'production') {
            logger.add(new winston.transports.Console({
                format: winston.format.simple()
            }))
        }

        const jsonBodyParser = bodyParser.json()

        const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

        const app = express()

        app.use(cors())    

        app.use(morgan('combined', { stream: accessLogStream }))

        app.post('/users', jsonBodyParser, registerUser)

        app.post('/users/auth', jsonBodyParser, authenticateUser)

        app.get('/users', tokenParse, retrieveUser)

        app.get('/events', jwtVerifierMidWare, retrieveUserEvents )

        app.get('/lastevents', retrieveLastUserEvents )

        app.patch('/users/suscribe', [jwtVerifierMidWare, jsonBodyParser], suscribe)

        app.get('/users/suscribedevents', jwtVerifierMidWare, suscribedEvents)

        app.post('/users/:id/events', [jwtVerifierMidWare, jsonBodyParser], createEvent)

        app.patch('/events/:id', [jwtVerifierMidWare, jsonBodyParser], updateEvent)

        app.delete('/delete/:id', jwtVerifierMidWare, deleteEvent)

        app.listen(port, () => logger.info(`server ${name} ${version} up and runing on port ${port}`))

        process.on('SIGINT', () => {
            logger.info('server abruptly stopped')

            process.exit(0)
        })
    })