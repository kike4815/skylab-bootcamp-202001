const { retrieveLastEvents } = require('../logic')

module.exports = (req, res) => {
    try {
        retrieveLastEvents()
            .then(events =>
                res.status(200).json(events)
            )
            .catch(error => {
                let status = 400

                const { message } = error

                res
                    .status(status)
                    .json({
                        error: message
                    })
            })
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