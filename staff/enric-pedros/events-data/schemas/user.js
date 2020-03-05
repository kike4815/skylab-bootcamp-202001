const { Types: {ObjectId} } = require('mongoose')

module.exports = {
    name: {type: String, required: true},
    surname: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    created: {type: Date, default: Date.now},
    authenticated: {type: Date},
    createdEvents: {type: [ObjectId]},
    suscribedEvents: {type: [ObjectId]}

}