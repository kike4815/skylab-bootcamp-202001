const { validate } = require('../utils')
const { models: { User, Event } } = require('../data')
const { NotFoundError } = require('../errors')

module.exports = (id, title, description, location, date) => {
    validate.string(id, 'id')
    validate.string(title, 'title')
    validate.string(description, 'description')
    validate.string(location, 'location')
    validate.type(date, 'date', Date)

    return User.findById(id)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            const event = new Event({ publisher: id, title, description, location, date, created: new Date })

            user.published.push(event.id)

            return Promise.all([user.save(), event.save()])
        })
        .then(() => { })
}