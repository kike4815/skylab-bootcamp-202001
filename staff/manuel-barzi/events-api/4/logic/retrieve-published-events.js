const { models: { Event } } = require('../data')

module.exports = id => {
    return Event.find({ date: { $gte: new Date } })
}