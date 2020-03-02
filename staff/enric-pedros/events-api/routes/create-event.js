const { createEvent } = require('../logic')
const { ContentError } = require('../errors')

module.exports = (req, res) => {
    const { params: { id }, body: { title, description, location, date } } = req

    try {
        createEvent(id, title, description, location, new Date(date))
            .then(() => res.status(201).end())
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