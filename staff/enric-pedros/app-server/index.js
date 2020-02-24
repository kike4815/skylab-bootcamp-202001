const express = require('express')
const { logger, loggerMidWare } = require('./utils')
const path = require('path')
const { authenticateUser, retrieveUser, registerUser,searchVehicles,retrieveVehicle,togglefavs } = require('./logic')
const bodyParser = require('body-parser')
const session = require('express-session')
const { Login, App, Home, Register, Landing,Results,Details } = require('./components')

const urlencodedBodyParser = bodyParser.urlencoded({ extended: false })

const { argv: [, , port = 8080] } = process

logger.level = logger.DEBUG
logger.path = path.join(__dirname, 'server.log')

logger.debug('setting up server')

const app = express()

app.use(loggerMidWare)
app.use(express.static(path.join(__dirname, 'public')))
app.use('/components', express.static(path.join(__dirname, 'components'))) // NOTE to see sass files in browser
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: true }))

app.get('/', ({ session: { acceptCookies } }, res) => {
    try{
        if (token){
            retrieveUser(token,error=>{
                res.send(App({ title: 'My App', body: Search(), acceptCookies }))
            })    
        }else{

            res.send(App({ title: 'My App', body: Landing(), acceptCookies }))
        }
    }catch(error){
        res.send(App({ title: 'My App', body: Login(), acceptCookies }))

    }
})

app.get('/login', (req, res) => {
    const { session: { username } } = req
    if (username) return res.redirect(`/home/${username}`)

    const { session: { acceptCookies } } = req

    res.send(App({ title: 'Login', body: Login(), acceptCookies }))
})

app.post('/login', urlencodedBodyParser, (req, res) => {
    const { body: { username, password }, session, token } = req

    try {
        authenticateUser(username, password, (error, token) => {
            if (error) {
                const { message } = error
                const { session: { acceptCookies } } = req

                return res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies }))
            }

            retrieveUser(token, (error, user) => {
                if (error) {
                    const { message } = error
                    const { session: { acceptCookies } } = req

                    return res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies }))
                }

                session.token = token
            
                const { username } = user

                res.redirect(`/home/${username}`)
            })
        })
    } catch ({ message }) {
        const { session: { acceptCookies } } = req

        res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies }))
    }
})

app.get(`/home/:username/`, (req, res) => {
    const { params: { username }, session: { token } } = req
    retrieveUser(token, (error, user) => {
        if (error) {
            const { message } = error
            const { session: { acceptCookies } } = req

            return res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies }))
        }

        const { username: _username } = user

        if (username === _username) {
            const { name } = user

            const { session: { acceptCookies } } = req

            res.send(App({ title: 'Home', body: Home({ name, username}), acceptCookies }))

        } else res.redirect('/login')
    })
})
app.get(`/search`,(req,res)=>{
    const {session: {acceptCookies, token },query} = req
    req.session.query = query
    try{
    retrieveUser(token, (error, user) => {
        if (error) {
            const { message } = error
            const { session: { acceptCookies } } = req
            return res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies }))
        }
            const { name } = user
            const _query = query.query
            

            searchVehicles(token, _query, (error,results)=>{
                if(error){
                   res.send(App({ title: 'Home', body: Home({error}), acceptCookies }))
                }
                else{
                   res.send(App({ title: 'Home', body: Home({name,results}), acceptCookies }))
        
                }
        
            })
        
        })
    }catch({error}){
        res.send(App({ title: 'Home', body: Home({error:message}), acceptCookies }))
    }

})


app.get('/details/:id',({session: {acceptCookies, token}, params:{id}}, res) => {

    retrieveVehicle(token,id,(error,result)=>{
        if(error)
            res.redirect(req.get('referer'))
        if (result)
            res.send(App({ title: `${result.name}`, body: Details({result}), acceptCookies }))
    })
})
app.get('/back',(req,res)=>{
    const {session:{query}} = req

    res.redirect(`/search?query=${query.query}`)
})


    
app.post('/favs/:id',(req,res)=>{
    const {session: {token},params:{id}} = req
 
    togglefavs(token,id,(error)=>{
        if(error){
            res.send(App({ title: 'Home', body: Home({error}), acceptCookies }))
         }
        res.send('<h1>Hola Mundo</h1>')
    })
    
})

app.post('/logout', urlencodedBodyParser, ({ session }, res) => {
    session.destroy(() => res.redirect('/login'))
})

app.post('/register', urlencodedBodyParser, (req, res) => {
    const { body: { name, surname, username, password } } = req

    try {
        registerUser(name, surname, username, password,(error)=>{
            if (error) {
                const { message } = error
                const { session: { acceptCookies } } = req 
                return res.send(App({ title: 'Register', body: Register({ error: message }), acceptCookies }))
                  
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




app.listen(port, () => logger.info(`server up and running on port ${port}`))

process.on('SIGINT', () => {
    logger.warn(`server abruptly stopped`)

    process.exit(0)
})