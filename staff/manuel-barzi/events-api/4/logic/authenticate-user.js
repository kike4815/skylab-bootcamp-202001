const { validate } = require('../utils')
const { models: { User } } = require('../data')
const { NotAllowedError } = require('../errors')

/**
 * Checks user credentials against the storage
 * 
 * @param {string} email user's unique e-mail
 * @param {string} password user's password
 * 
 * @returns {Promise<string>} user id from storage
 * 
 * @throws {ContentError} if user data does not follow the format and content rules
 * @throws {TypeError} if user data does not have the correct type
 * @throws {NotAllowedError} on wrong credentials
 */
module.exports = (email, password) => {
    validate.string(email, 'email')
    validate.email(email)
    validate.string(password, 'password')

    return User.findOne({ email, password })
        .then(user => {
            if (!user) throw new NotAllowedError(`wrong credentials`)

            user.authenticated = new Date

            return user.save()
        })
        .then(({ id }) => id)
}