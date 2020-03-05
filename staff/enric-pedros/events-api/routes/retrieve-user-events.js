const { retrieveUserEvents } = require('../logic')
const { NotFoundError, ContentError } = require('events-error')

module.exports = (req, res) => {
    const {payload: {sub : id}} = req

    try {
        retrieveUserEvents(id)
        .then(events =>{
            res.status(200).json(events)
        })
        .catch(error =>{
            let status = 400

            switch(true) {
                case error instanceof NotFoundError:
                    status = 404
                    break
            }
            const {message} = error

            res 
            .status(status)
            .json(message)
        })
    } catch (error) {
        let status = 400
        
        if (error instanceof ContentError)
            status = 406
        
        const {message} = error
        
        res
            .status(status)
            .json(message)
        
    }
}