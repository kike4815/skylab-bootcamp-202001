const jwt = require('jsonwebtoken')
// const atob = require('atob')

const SECRET = 'my grandmas dad had a second life'

const id = 'user-id-abc'

const token = jwt.sign({ sub: id }, SECRET, { expiresIn: '1h' })

// let [, payload] = token.split('.')
// payload = JSON.parse(atob(payload))

try {
    const payload = jwt.verify(token, SECRET)
    //const payload = jwt.verify(token + '-manipulation', SECRET)

    debugger
} catch (error) {
    debugger
}