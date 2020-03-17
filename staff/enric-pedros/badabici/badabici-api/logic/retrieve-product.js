const { models: { Product } } = require('badabici-data')
const { mongoose: { Types: { ObjectId } } } = require('badabici-data')
const { validate } = require('badabici-utils')
const { NotFoundError } = require('badabici-errors')

module.exports = id => {
    validate.string(id, 'id')
    debugger
    return Product.findById(id)
        .then(product => {
            debugger
            if (!product) throw new NotFoundError(`product with id ${id} not found`)
            // if(product.quantity < 1)throw new Error (`product isn't in stock`)
            return product
        })
        .then(({ id, category,subcategory,title, description,price,quantity,discount,image }) => ({ id, category,subcategory,title, description,price,quantity,discount,image }))
}