const { deleteProduct } = require('../../logic')
const { ContentError } = require('badabici-errors')

module.exports = (req, res) => {
    const { payload:{sub:id}, body: { id:productId } } = req

    try {
        
        deleteProduct(id,productId)
            .then(() => res.status(201).end()) //enviar mensaje desde el cliente de borrado ok!
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