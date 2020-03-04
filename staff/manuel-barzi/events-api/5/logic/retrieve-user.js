const { validate } = require('events-utils')
const { models: { User } } = require('events-data')
const { NotAllowedError } = require('events-errors')

module.exports = id => {
    validate.string(id, 'id')

    return User.findById(id)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${id} does not exist`)

            if (user.deactivated) throw new NotAllowedError(`user with id ${id} is deactivated`)

            user.retrieved = new Date

            return user.save()
        })
        .then(({ name, surname, email }) => ({ name, surname, email }))
}