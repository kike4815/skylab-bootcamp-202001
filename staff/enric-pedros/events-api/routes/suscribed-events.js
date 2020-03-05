const {suscribedEvent} = require('../logic')
const {ContentError, NotFoundError} = require('events-error')

module.exports = (req, res) =>{
    const {payload : {sub: id}} = req

    try {
        suscribedEvent(id)
        .then(evnets =>{
            res.status(200).json(evnets)
        })
        .catch(error =>{
            let status = 400

            if (error instanceof NotFoundError) status = 406

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