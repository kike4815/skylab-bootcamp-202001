const { validate } = require('../utils')
const { models: { User } } = require('../data')
const { NotAllowedError } = require('../errors')

module.exports = (name, surname, email, password) => {
    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(email, 'email')
    validate.email(email)
    validate.string(password, 'password')

    return User.findOne({ email })
        .then(user => {
            if (user) throw new NotAllowedError(`user with email ${email} already exists`)

            user = new User({ name, surname, email, password, created: new Date })

            return user.save()
        })
        .then(() => { })

}