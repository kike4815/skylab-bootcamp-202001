const { ObjectId } = require('../database')

module.exports = {
    _id: { type: ObjectId },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    created: { type: Date, required: true },
    authenticated: { type: Date },
    retrieved: { type: Date }
}