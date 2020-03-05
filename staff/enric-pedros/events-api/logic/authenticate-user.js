const { validate } = require('events-utils')
const { models: { User } } = require('events-data')
const { NotAllowedError } = require('events-error')

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