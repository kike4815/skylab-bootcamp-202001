const { retrieveLastEvents } = require('../logic')
const { NotFoundError, NotAllowedError } = require('../errors')
module.exports = (req, res) => {
    try {
        
        retrieveLastEvents()
            .then(events =>
                res.status(200).json(events)
            )
            .catch(({ message }) =>
                res
                    .status(401)
                    .json({
                        error: message
                    })
            )
    } catch (error) {
        let status = 400

        const { message } = error
        res
            .status(status)
            .json({
                error: message
            })
    }
}