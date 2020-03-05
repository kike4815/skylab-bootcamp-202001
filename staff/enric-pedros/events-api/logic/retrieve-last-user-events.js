const {models: {Event}} = require('events-data')

module.exports = () =>{

    return Event.find().sort({created: -1})
        .then( events => {
    
            return events
        })

}