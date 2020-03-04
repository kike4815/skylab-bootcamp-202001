const { models: { User, Event } } = require('../data')
const { Types: { ObjectId } } = require('mongoose')
const { validate } = require('../utils')
const { NotFoundError } = require('../errors')

module.exports = id => {
    validate.string(id, 'id')

    return User.findById(id)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            return Event.find({ publisher: ObjectId(id), date: { $gte: new Date } })
                .lean()
                .then(events => {
                    // sanitize
                    events.forEach(event => {
                        event.id = event._id.toString()

                        delete event._id

                        event.publisher = event.publisher.toString()
                    })

                    return events
                })
        })
}