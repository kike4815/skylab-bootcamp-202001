const { validate } = require('badabici-utils')
const { models: { User } } = require('badabici-data')
const { NotAllowedError } = require('badabici-errors')
const { compare } = require('bcryptjs')
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
module.exports = async (email, password) => {
    validate.string(email, 'email')
    validate.email(email)
    validate.string(password, 'password')

    const user = await User.findOne({ email })
    
    if (!user) throw new NotAllowedError('wrong credentials')
    
    const validPassword = await compare(password, user.password)
    
    if (!validPassword) throw new NotAllowedError('wrong credentials')

    const { id } = await user.save()
    
    return id
}


// const { validate } = require('badabici-utils')
// const { models: { User } } = require('badabici-data')
// const { NotAllowedError } = require('badabici-errors')
// const bcrypt = require('bcryptjs')

// /**
//  * Checks user credentials against the storage
//  * 
//  * @param {string} email user's unique e-mail
//  * @param {string} password user's password
//  * 
//  * @returns {Promise<string>} user id from storage
//  * 
//  * @throws {ContentError} if user data does not follow the format and content rules
//  * @throws {TypeError} if user data does not have the correct type
//  * @throws {NotAllowedError} on wrong credentials
//  */
// module.exports = (email, password) => {
//     validate.string(email, 'email')
//     validate.email(email)
//     validate.string(password, 'password')

//     return User.findOne({ email })
//         .then(user => {
//             if (!user) throw new NotAllowedError(`wrong credentials`)

//             return bcrypt.compare(password, user.password)
//                 .then(validPassword => {

//                     if (!validPassword) throw new NotAllowedError(`wrong credentials`)

//                     return user.save()
//                 })
//                 .then(({ id }) => id)
//         })
// }