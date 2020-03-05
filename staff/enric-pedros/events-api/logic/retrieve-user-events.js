const { validate } = require('events-utils')
const {models: {Event}} = require('events-data')

module.exports = (id) =>{
    validate.string(id, 'id')

    const _id = ObjectId(id)

    return Event.find({publisher: _id})
        .then( event => {

            return event
        })

}