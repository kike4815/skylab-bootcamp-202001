const { ObjectId } = require('../database')

module.exports = {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    publisher: { type: ObjectId, required: true },
    created: { type: Date, required: true }
}