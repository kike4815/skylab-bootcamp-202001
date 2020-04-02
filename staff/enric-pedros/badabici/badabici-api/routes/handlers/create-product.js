const { createProduct } = require('../../logic')
const { ContentError } = require('badabici-errors')

module.exports = (req, res) => {
    const { payload:{sub:userId}, body: { category,subcategory,title, description,price,quantity,discount } } = req

    try {
         
        debugger
        createProduct(userId, category,subcategory,title, description,price,quantity,discount) //prueba
            .then(id => res.status(201).json({id})) //aki undefined le pasa
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

