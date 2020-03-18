const { validate } = require('badabici-utils')
const { models: { User } } = require('badabici-data')
const { NotAllowedError } = require('badabici-errors')
const bcrypt = require('bcryptjs')

module.exports = (name, surname, email, password,member,role) => {
    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(email, 'email')
    validate.email(email)
    validate.type(member,'member',Boolean)
    validate.type(role, 'role',String)
    validate.string(password, 'password')

    return User.findOne({ email })
        .then(user => {
            if (user) throw new NotAllowedError(`user with email ${email} already exists`)

            return bcrypt.hash(password, 10)
        })
        .then(password => {
            user = new User({ name, surname, email, password, member, role : 'superadmin' })

            return user.save()
        })
        .then(() => { })
}