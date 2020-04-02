const { validate } = require('badabici-utils')
const { models: { Product } } = require('badabici-data')
const { NotFoundError } = require('badabici-errors')

module.exports = id => {
    validate.string(id, 'id')

    return Product.findById(id)
        .lean()
        .then(product => {

            if (!product) throw new NotFoundError(`product with id ${id} does not exist`)

            const { _id, image } = product

            return `${_id}/${image}`
        })
}