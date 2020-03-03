const { models: { Event } } = require('../data')

module.exports = () => Event.find({ date: { $gte: new Date } }).lean()
    .then(events => {
        // sanitize
        events.forEach(event => {
            event.id = event._id.toString()
            
            delete event._id
        })
        
        return events
    })