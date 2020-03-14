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

    // if (newfields.newpassword !== 'undefined')
        
    return User.findById(id)
        .then(user => {
            if (!user) throw new NotAllowedError(`the user does not exists`)
            if (newfields.newpassword) {
                
                return bcrypt.compare(newfields.password, user.password)
                    .then(async (validPassword) => {
                        if (!validPassword) throw new NotAllowedError(`wrong credentials`)
                        
                        delete newfields.password
                        const newpass = await bcrypt.hash(newfields.newpassword, 10)

/*
        "_id" : ObjectId("5e6cc45d8a17784608dda324"),
        "chart" : [ ],
        "member" : false,
        "role" : "client",
        "name" : "rubenrules",
        "surname" : "ruben",
        "email" : "ruben@mail.com",
        "password" : "$2a$10$la39btO.ZHxPXE3SMj6jCOti2v2R.cvqGXv4aZa6ghBLRi9n4n8Ba",
        "orders" : [ ],
        "__v" : 0
*/

debugger
                        return User.findByIdAndUpdate(id, { password: newpass })
                    })
                    .then(() => {
                        
                        return User.findByIdAndUpdate(id, { $set: newfields })
                            .then(() => { })
                    })
            } else {
                return User.findByIdAndUpdate(id, { $set: newfields })
                    .then(() => { })
            }
        })
    
}