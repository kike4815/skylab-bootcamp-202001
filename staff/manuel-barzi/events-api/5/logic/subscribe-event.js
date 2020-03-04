const { validate } = require('events-utils')
const { models: { User, Event } } = require('events-data')
const { NotFoundError } = require('events-errors')

module.exports = (id, eventId) => {
    validate.string(id, 'id')
    validate.string(eventId, 'eventId')

    return Promise.all([User.findById(id), Event.findById(eventId)])
        .then(([user, event]) => {
            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            if (!event) throw new NotFoundError(`event with id ${id} not found`)

            user.subscribed.push(event.id)
            event.subscribed.push(user.id)

            return Promise.all([user.save(), event.save()])
        })
        .then(() => { })
}