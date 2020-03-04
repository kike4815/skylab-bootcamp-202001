const { validate } = require('../utils')
const { models: { User } } = require('../data')
const { NotAllowedError } = require('../errors')

module.exports = (email, password) => {
    validate.string(email, 'email')
    validate.email(email)
    validate.string(password, 'password')

    return User.findOne({ email, password })
        .then(user => {
            if (!user) throw new NotAllowedError(`wrong credentials`)

            user.authenticate = new Date

            return user.save()
        })
        .then(({id}) => id)

}