const {validate} = require('events-utils')
const {models: {Event}} = require('events-data')

module.exports = (id) => {
    validate.string(id, 'id')

    return Event.find({suscribed: id})
    .then(_events =>{
        return _events
    })

}