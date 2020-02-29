const { validate } = require('../utils')
const { database, models: { User } } = require('../data')
const { NotAllowedError } = require('../errors')

module.exports = (name, surname, email, password) => {
    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(email, 'email')
    validate.email(email)
    validate.string(password, 'password')

    const users = database.collection('users')

    return users.findOne({ email })
        .then(user => {
            if (user) throw new NotAllowedError(`user with email ${email} already exists`)

            user = new User({ name, surname, email, password })

            return users.insertOne(user)
        })
        .then(() => { })
}