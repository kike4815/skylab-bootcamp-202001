const { Schema, SchemaTypes: {ObjectId} } = require('mongoose')

module.exports =  new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    date: {type: Date, required: true},
    location: {type: String, required: true},
    publisher: {type: ObjectId, required: true, ref: 'User'},
    created: {type: Date, default: Date.now},
    suscribed: {type: [ObjectId]}
})