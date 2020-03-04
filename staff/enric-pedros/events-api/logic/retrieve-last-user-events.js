const { Types: {ObjectId} } = require('mongoose')
const {models: {Event}} = require('../data')

module.exports = () =>{

    return Event.find().sort({created: -1})
        .then( events => {
    
            return events
        })

}