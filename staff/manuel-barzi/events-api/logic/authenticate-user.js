const { validate } = require('../utils')
const { users } = require('../data')
const jwt = require('jsonwebtoken')

const fs = require('fs').promises
const path = require('path')

const { env: { SECRET } } = process

module.exports = (email, password) => {
    validate.string(email, 'email')
    validate.email(email)
    validate.string(password, 'password')

    const user = users.find(user => user.email === email && user.password === password)

    if (!user) throw new Error(`wrong credentials`)

    const token = jwt.sign({ sub: user.id }, SECRET, { expiresIn: '1h' })

    user.authenticated = new Date

    return fs.writeFile(path.join(__dirname, '../data/users.json'), JSON.stringify(users, null, 4))
        .then(() => token)
}