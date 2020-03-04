const { subscribeEvent } = require('../logic')
const { ContentError } = require('../errors')

module.exports = (req, res) => {
    const { params: { id, eventId } } = req

    try {
        subscribeEvent(id, eventId)
            .then(() => res.end())
            .catch(error => {
                let status = 400

                const { message } = error
                
                if (error instanceof NotFoundError)
                    status = 404

                res
                    .status(status)
                    .json({
                        error: message
                    })
            })
    } catch (error) {
        let status = 400

        if (error instanceof TypeError || error instanceof ContentError)
            status = 406 // not acceptable

        const { message } = error

        res
            .status(status)
            .json({
                error: message
            })
    }
}