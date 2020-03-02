
const { database } = require('../data')
module.exports = () => {
    
    const events = database.collection('events')
    const now = new Date 
    return events.find({date: { $gt: now}}).sort( { date: 1 } ).toArray()
}