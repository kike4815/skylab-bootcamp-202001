const { discounts } =require('../../logic')
const { ContentError } = require('badabici-errors')

module.exports = (req, res) => {

    try {
    
         discounts()
            .then(products => {
                res
                .status(201)
                .json(products)
            }) 
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
