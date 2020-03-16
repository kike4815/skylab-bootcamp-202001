require('dotenv').config()

const { env: { PORT = 8080, NODE_ENV: env, MONGODB_URL }, argv: [, , port = PORT] } = process

const express = require('express')
const winston = require('winston')
const { name, version } = require('./package')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')
const { cors,jwtVerifierMidWare } = require('./mid-wares')
const { mongoose } = require('badabici-data')
const router = require('./routes')
const bodyParser = require('body-parser')
const jsonBodyParser = bodyParser.json()

const {
    registerUser,
    authenticateUser,
    retrieveUser,
    createProduct,
    registerAdmin,
    deleteProduct,
    modifyProduct,
    searchProducts,
    updateUser,
    addForBuy,
    retrieveShopping,
    discountsProducts,
    buyit

} = require('./routes/handlers')



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

        const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

        const app = express()

        app.use(cors)

        app.use(morgan('combined', { stream: accessLogStream }))

        app.use('/api', router)

        app.post('/users', jsonBodyParser, registerUser)

        app.post('/users/auth', jsonBodyParser, authenticateUser)

        app.post('/admin',jsonBodyParser,registerAdmin) //route only super user

        app.post('/admin/auth', jsonBodyParser, authenticateUser)

        app.post('/products/admin', [jwtVerifierMidWare, jsonBodyParser], createProduct)

        app.post('/shopcard',[jwtVerifierMidWare, jsonBodyParser],addForBuy)
        
        app.get('/users',jwtVerifierMidWare, retrieveUser)

        app.get('/search', searchProducts)

        app.get('/discounts',discountsProducts)

        app.get('/user/retrieve/chart',jwtVerifierMidWare, retrieveShopping)
        
        app.delete('/products/admin', [jwtVerifierMidWare, jsonBodyParser], deleteProduct)
        
        app.patch('/users/ordered',[jwtVerifierMidWare, jsonBodyParser], buyit)

        app.patch('/users/mod',[jwtVerifierMidWare, jsonBodyParser], updateUser)

        app.patch('/products/mod/:id/admin', [jwtVerifierMidWare, jsonBodyParser], modifyProduct)

        app.listen(port, () => logger.info(`server ${name} ${version} up and running on port ${port}`))

        process.on('SIGINT', () => {
            logger.info('server abruptly stopped')

            process.exit(0)
        })
    })