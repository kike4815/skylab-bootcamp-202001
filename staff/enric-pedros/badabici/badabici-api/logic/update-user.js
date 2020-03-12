const { validate } = require('badabici-utils')
const { models: { User } } = require('badabici-data')
const { NotAllowedError } = require('badabici-errors')
const bcrypt = require('bcryptjs')

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
module.exports = (id, body) => {
    // const { name, surname, email, newpassword, password } = body

    // validate.string(id, 'id')
    // validate.string(newpassword, 'newpassword')
    // validate.string(password, 'password')

    // const newfields = {}
    // if (typeof name !== 'undefined') {
    //     validate.string(name, 'name')
    //     newfields['name'] = name
    // }
    // if (typeof surname !== 'undefined') {
    //     validate.string(surname, 'surname')
    //     newfields['surname'] = surname

    // } if (typeof email !== 'undefined') {
    //     validate.string(email, 'email')
    //     newfields['email'] = email
    // }

    validate.type(body, 'body', Object)

    const newfields = {}

    for (const key in body) {
        newfields[key] = body[key]
    }

    if (newfields.newpassword !== 'undefined')
        debugger
    return User.findById(id)
        .then(user => {
            if (!user) throw new NotAllowedError(`the user does not exists`)
            if (newfields.newpassword) {
                debugger
                return bcrypt.compare(newfields.password, user.password)
                    .then(async (validPassword) => {
                        if (!validPassword) throw new NotAllowedError(`wrong credentials`)
                        debugger
                        delete newfields.password
                        const newpass = await bcrypt.hash(newfields.newpassword, 10)


                        return User.findByIdAndUpdate(id, { password: newpass })
                    })
                    .then(() => {
                        debugger
                        return User.findByIdAndUpdate(id, { $set: newfields })
                            .then(() => { })
                    })
            } else {
                return User.findByIdAndUpdate(id, { $set: newfields })
                    .then(() => { })
            }
        })
    
}