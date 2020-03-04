const { retrievePublishedEvents } = require('../logic')
const { NotFoundError } = require('events-errors')

module.exports = (req, res) => {
    const { payload: { sub: id } } = req

    try {
        retrievePublishedEvents(id)
            .then(events =>
                res.status(200).json(events)
            )
            .catch(error => {
                let status = 400

                if (error instanceof NotFoundError)
                    status = 404

                const { message } = error

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