const express = require('express')
const { logger, loggerMidWare, cookieParserMidWare, acceptCookiesMidWare } = require('./utils')
const path = require('path')
const { authenticateUser, retrieveUser, registerUser } = require('./logic')
const bodyParser = require('body-parser')
const { Login, App, Home, Register, Landing } = require('./components')
const { sessions } = require('./data')

const urlencodedBodyParser = bodyParser.urlencoded({ extended: false })

const { argv: [, , port = 8080] } = process

logger.level = logger.DEBUG
logger.path = path.join(__dirname, 'server.log')

logger.debug('setting up server')

const app = express()

app.use(loggerMidWare)
app.use(express.static(path.join(__dirname, 'public')))
app.use('/components', express.static(path.join(__dirname, 'components'))) // NOTE to see sass files in browser
app.use(cookieParserMidWare)
app.use(acceptCookiesMidWare)

app.get('/', ({ acceptCookies }, res) => {
    res.send(App({ title: 'My App', body: Landing(), acceptCookies }))
})

app.get('/login', (req, res) => {
    const { cookies: { username } } = req

    if (sessions.includes(username)) return res.redirect(`/home/${username}`)

    const { acceptCookies } = req

    res.send(App({ title: 'Login', body: Login(), acceptCookies }))
})

app.post('/login', urlencodedBodyParser, (req, res) => {
    const { body: { username, password } } = req

    try {
        authenticateUser(username, password)

        sessions.push(username)

        const { cookies: { username: _username } } = req

        username !== _username && res.setHeader('set-cookie', `username=${username}`)

        res.redirect(`/home/${username}`)
    } catch ({ message }) {
        const { acceptCookies } = req

        res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies }))
    }
})

app.get('/home/:username', (req, res) => {
    const { params: { username } } = req

    if (sessions.includes(username)) {
        const { name } = retrieveUser(username)

        const { cookies: { username: _username } } = req

        username !== _username && res.setHeader('set-cookie', `username=${username}`)

        const { acceptCookies } = req

        res.send(App({ title: 'Home', body: Home({ name, username }), acceptCookies }))
    } else res.redirect('/login')
})

app.post('/logout', urlencodedBodyParser, (req, res) => {
    const { body: { username } } = req

    const index = sessions.indexOf(username)

    sessions.splice(index, 1)

    res.clearCookie('username')
    res.clearCookie('accept-cookies')

    res.redirect('/login')
})

app.post('/register', urlencodedBodyParser, (req, res) => {
    const { body: { name, surname, username, password } } = req

    try {
        registerUser(name, surname, username, password)

        res.redirect('/login')
    } catch ({ message }) {
        const { acceptCookies } = req

        res.send(App({ title: 'Register', body: Register({ error: message }), acceptCookies }))
    }
})

app.get('/register', ({ acceptCookies }, res) => {
    res.send(App({ title: 'Register', body: Register(), acceptCookies }))
})

app.post('/accept-cookies', (req, res) => {
    res.cookie('accept-cookies', true)

    res.redirect(req.get('referer'))
})

app.listen(port, () => logger.info(`server up and running on port ${port}`))

process.on('SIGINT', () => {
    logger.warn(`server abruptly stopped`)

    process.exit(0)
})