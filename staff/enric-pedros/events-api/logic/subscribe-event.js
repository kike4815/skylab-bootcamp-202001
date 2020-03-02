const { validate } = require('../utils')
const { database, database: { ObjectId }, models: { Event } } = require('../data')

module.exports = (userId, eventId) => {
    validate.string(userId, 'userId')
    validate.string(eventId, 'eventId')

    const _userId = ObjectId(userId)
    const _eventId = ObjectId(eventId)


    const users = database.collection('users')
    const events = database.collection('events')

    return users.findOne({_id: _userId, subscribedEvents: _eventId})
        .then(user => {
            if (user) throw new Error(`user with ${id} is already registred in the event with ${eventId} id`)
        })
        .then(() => {
            return users.updateOne({_id: _userId}, {$push: {subscribedEvents: _eventId}})
        })
        .then(() => {
            return events.updateOne({_id: _eventId}, {$push: {subscribedUsers: _userId}})
        })
        .then(() =>{})
}