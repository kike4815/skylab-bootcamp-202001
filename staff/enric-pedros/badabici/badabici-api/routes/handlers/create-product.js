const { createProduct } = require('../../logic')
const { ContentError } = require('badabici-errors')

module.exports = (req, res) => {
    const { payload:{sub:id}, body: { category,subcategory,title, description,price,image,quantity,discount } } = req

    try {
        
        createProduct(id, category,subcategory,title, description,price,image,quantity,discount)
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