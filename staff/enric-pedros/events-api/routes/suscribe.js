const {suscribe} = require('../logic')
const {ContentError} = require('events-error')

module.exports = (req, res) =>{
    const {payload: {sub : userId}, body: {eventId}} = req

    try {
        suscribe(userId, eventId)
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