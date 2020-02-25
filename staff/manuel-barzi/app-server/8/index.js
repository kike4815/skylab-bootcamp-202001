const express = require('express')
const { logger, loggerMidWare, /*wait*/ } = require('./utils')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const { landing, login, loginPost, logout, register, registerPost, acceptCookies, search, toggleFav } = require('./routes')

const urlencodedBodyParser = bodyParser.urlencoded({ extended: false })

const { argv: [, , port = 8080] } = process

logger.level = logger.DEBUG
logger.path = path.join(__dirname, 'server.log')

logger.debug('setting up server')

const app = express()

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'components'))

app.use(loggerMidWare)
app.use(express.static(path.join(__dirname, 'public')))
app.use('/components', express.static(path.join(__dirname, 'components'))) // NOTE to see sass files in browser
app.use(session({
    secret: 'my grandmas dad had a second life',
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false,
    saveUninitialized: true,
    store: new FileStore({})
}))

app.get('/', landing)

app.get('/login', login)

app.post('/login', urlencodedBodyParser, loginPost)

app.post('/logout', urlencodedBodyParser, logout)

app.get('/register', register)

app.post('/register', urlencodedBodyParser, registerPost)

app.post('/accept-cookies', acceptCookies)

app.get('/search', search)

app.post('/toggle-fav/:id', toggleFav)

app.listen(port, () => logger.info(`server up and running on port ${port}`))

process.on('SIGINT', () => {
    logger.warn(`server abruptly stopped`)

    process.exit(0)
})