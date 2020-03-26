const { retrieveProduct } = require('../../logic')
const { NotFoundError } = require('badabici-errors')

module.exports = (req, res) => {
    // const { payload: { sub: id } } = req
    const { params: { id } } = req
    debugger
    try {
        retrieveProduct(id)
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