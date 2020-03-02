const { validate } = require('../utils')
const { database } = require('../data')
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

    const users = database.collection('users')

    return users.findOne({ email, password })
        .then(user => {
            if (!user) throw new NotAllowedError(`wrong credentials`)

            const { _id } = user

            return users.updateOne({ _id }, { $set: { authenticated: new Date } })
                .then(() => _id.toString())
        })
}