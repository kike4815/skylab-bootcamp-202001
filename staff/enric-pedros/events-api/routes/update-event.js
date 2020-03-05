const {updateEvent} = require('../logic')
const {ContentError} = require('events-error')

module.exports = (req, res) => {
    const {params: {id: eventId}, body, payload: {sub : userId}} = req

    try {
        updateEvent(userId, body, eventId)
        .then(() =>{
            res.status(200).json()
        })
        .catch(error =>{
            let status = 400

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