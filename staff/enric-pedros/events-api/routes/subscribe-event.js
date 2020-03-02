const { subscribeEvent } = require('../logic')
const { NotFoundError, NotAllowedError } = require('../errors')

module.exports = (req, res) => {
    const { payload: { sub: id }, body: {event} } = req

    debugger
    try {
        subscribeEvent(id, event)
            .then(() =>
                res.status(200).json({message: 'user has been subscribed to this event'})
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

        switch (true) {
            case error instanceof NotFoundError:
                status = 404 // not found
                break
            case error instanceof NotAllowedError:
                status = 403 // forbidden
        }

        const { message } = error

        res
            .status(status)
            .json({
                error: message
            })
    }
}