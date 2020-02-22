const express = require('express')
const logger = require('./utils/logger')
const path = require('path')
const loggerMidWare = require('./utils/logger-mid-ware')
// const staticMidWare = require('./utils/static-mid-ware')
const urlencodedBodyParser = require('./utils/urlencoded-body-parser')
const { authenticateUser, retrieveUser } = require('./logic')

const { argv: [, , port = 8080] } = process

logger.level = logger.DEBUG
logger.path = path.join(__dirname, 'server.log')

logger.debug('setting up server')

const app = express()

app.use(loggerMidWare)

//app.use(staticMidWare(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public')))

// TRY this from CLI: $ curl http://localhost:8080/authenticate -X POST -d 'hola=mundo'

app.use(urlencodedBodyParser)

app.post('/authenticate', (req, res) => {
    // TODO call authenticate user logic

    const { username, password } = req.body

    try {
        authenticateUser(username, password)

        const user = retrieveUser(username)

        res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
</head>
<body>
    <h1>Welcome, ${user.name}!</h1>
</body>
</html>`)
    } catch ({ message }) {
        res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
</head>
<body>
    <h1>Login</h1>
    <form action="/authenticate" method="POST">
        <input type="text" name="username">
        <input type="password" name="password">

        <p>${message}</p>

        <button>Send</button>
    </form>
</body>
</html>`)
    }
})

app.listen(port, () => logger.info(`server up and running on port ${port}`))

process.on('SIGINT', () => {
    logger.warn(`server abruptly stopped`)

    process.exit(0)
})