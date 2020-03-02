const { validate } = require('../utils')
const { database: { ObjectId }, models: { User } } = require('../data')
const { NotAllowedError } = require('../errors')

module.exports = id => {
    validate.string(id, 'id')

    const _id = ObjectId(id)

    return User.findOne({ _id })
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${id} does not exist`)

            if (user.deactivated) throw new NotAllowedError(`user with id ${id} is deactivated`)

            user.retrieved = new Date

            return user.save()
        })
        .then(({ name, surname, email }) => ({ name, surname, email }))
}