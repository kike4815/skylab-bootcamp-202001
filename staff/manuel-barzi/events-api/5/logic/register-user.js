const { validate } = require('events-utils')
const { models: { User } } = require('events-data')
const { NotAllowedError } = require('events-errors')
const bcrypt = require('bcryptjs')

module.exports = (name, surname, email, password) => {
    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(email, 'email')
    validate.email(email)
    validate.string(password, 'password')

    return User.findOne({ email })
        .then(user => {
            if (user) throw new NotAllowedError(`user with email ${email} already exists`)

            return bcrypt.hash(password, 10)
        })
        .then(password => {
            user = new User({ name, surname, email, password, created: new Date })

            return user.save()
        })
        .then(() => { })
}