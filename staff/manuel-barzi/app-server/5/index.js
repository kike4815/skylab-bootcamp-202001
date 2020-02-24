const express = require('express')
const { logger, loggerMidWare, /*wait*/ } = require('./utils')
const path = require('path')
const { authenticateUser, retrieveUser, registerUser, searchVehicles, toggleFavVehicle } = require('./logic')
const bodyParser = require('body-parser')
const session = require('express-session')
const { Login, App, Register, Landing, Search, Results } = require('./components')
const FileStore = require('session-file-store')(session)

const urlencodedBodyParser = bodyParser.urlencoded({ extended: false })

const { argv: [, , port = 8080] } = process

logger.level = logger.DEBUG
logger.path = path.join(__dirname, 'server.log')

logger.debug('setting up server')

const app = express()

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

app.get('/', ({ session: { token, acceptCookies } }, res) => {
    if (token) {
        retrieveUser(token, (error, user) => {
            if (error) {
                const { message } = error
                const { session: { acceptCookies } } = req

                return res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies }))
            }

            const { name, username } = user

            res.send(App({ title: 'My App', body: Landing({ name, username }), acceptCookies }))
        })
    } else res.send(App({ title: 'My App', body: Landing(), acceptCookies }))
})

app.get('/login', (req, res) => {
    const { session: { username } } = req

    if (username) return res.redirect(`/home/${username}`)

    const { session: { acceptCookies } } = req

    res.send(App({ title: 'Login', body: Login(), acceptCookies }))
})

app.post('/login', urlencodedBodyParser, (req, res) => {
    const { body: { username, password }, session } = req

    try {
        authenticateUser(username, password, (error, token) => {
            if (error) {
                const { message } = error
                const { session: { acceptCookies } } = req

                return res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies }))
            }

            session.token = token

            session.save(() => {
                const { fav } = session

                if (fav) return res.redirect(307, `/toggle-fav/${fav}`)

                res.redirect('/')
            })

        })
    } catch ({ message }) {
        debugger
        const { session: { acceptCookies } } = req

        res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies }))
    }
})

app.post('/logout', urlencodedBodyParser, ({ session }, res) => {
    session.destroy(() => res.redirect('/'))
})

app.post('/register', urlencodedBodyParser, (req, res) => {
    const { body: { name, surname, username, password } } = req

    debugger

    try {
        registerUser(name, surname, username, password, error => {
            if (error) {
                // TODO

                return
            }

            res.redirect('/login')
        })
    } catch ({ message }) {
        const { session: { acceptCookies } } = req

        res.send(App({ title: 'Register', body: Register({ error: message }), acceptCookies }))
    }
})

app.get('/register', ({ session: { acceptCookies } }, res) => {
    res.send(App({ title: 'Register', body: Register(), acceptCookies }))
})

app.post('/accept-cookies', (req, res) => {
    const { session } = req

    session.acceptCookies = true

    res.redirect(req.get('referer'))
})

app.get('/search', (req, res) => {
    const { query: { query }, session: { token } } = req

    if (token) {
        retrieveUser(token, (error, user) => {
            if (error) {
                const { message } = error
                const { session: { acceptCookies } } = req

                return res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies }))
            }

            const { name, username } = user

            try {
                searchVehicles(token, query, (error, vehicles) => {
                    const { session: { acceptCookies } } = req

                    if (error) {
                        const { message } = error

                        return res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies }))
                    }

                    res.send(App({ title: 'Search', body: Landing({ name, username, query, results: vehicles }), acceptCookies }))
                })
            } catch ({ message }) {
                const { session: { acceptCookies } } = req

                res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies })) // ?
            }
        })
    } else
        try {
            searchVehicles(undefined, query, (error, vehicles) => {
                const { session: { acceptCookies } } = req

                if (error) {
                    const { message } = error

                    return res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies }))
                }

                res.send(App({ title: 'Search', body: Landing({ query, results: vehicles }), acceptCookies }))
            })
        } catch ({ message }) {
            const { session: { acceptCookies } } = req

            res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies })) // ?
        }
})

app.post('/toggle-fav/:id', (req, res) => {
    const { params: { id }, session } = req

    debugger

    const { token } = session

    if (!token) {
        session.referer = req.get('referer')

        session.fav = id

        return session.save(() => res.redirect('/login'))
    }

    try {
        toggleFavVehicle(token, id, error => {
            if (error) {
                // ?

                return
            }

            const { referer = req.get('referer') } = session

            delete session.referer
            delete session.fav

            session.save(() => res.redirect(referer))
        })
    } catch ({ message }) {
        // ?
    }
})

app.listen(port, () => logger.info(`server up and running on port ${port}`))

process.on('SIGINT', () => {
    logger.warn(`server abruptly stopped`)

    process.exit(0)
})