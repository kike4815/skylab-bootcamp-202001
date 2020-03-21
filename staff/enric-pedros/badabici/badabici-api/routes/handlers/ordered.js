const { buyit } = require('../../logic')
const { NotAllowedError, ContentError } = require('badabici-errors')

module.exports = (req, res) => {
    const { payload: { sub: id } } = req

    try {
        
        buyit(id)
            .then(() => res.status(201).end())
            .catch(error => {
                let status = 400

                if (error instanceof NotAllowedError)
                    status = 409 // conflict

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