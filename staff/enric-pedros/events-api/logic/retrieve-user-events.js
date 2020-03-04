const { Types: {ObjectId} } = require('mongoose')
const { validate } = require('../utils')
const {models: {Event}} = require('../data')

module.exports = (id) =>{
    validate.string(id, 'id')

    const _id = ObjectId(id)

    return Event.find({publisher: _id})
        .then( event => {

            return event
        })

}