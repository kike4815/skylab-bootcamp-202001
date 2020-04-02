const { models: { Product } } = require('badabici-data')
const { mongoose: { Types: { ObjectId } } } = require('badabici-data')
const { validate } = require('badabici-utils')
const { NotFoundError } = require('badabici-errors')

module.exports = id => {
    
    validate.string(id, 'id')
    
    return Product.findById(id)

        .then(product => {


            if (!product) throw new NotFoundError(`product with id ${id} not found`)
           
            const { _id,category,subcategory,title, description,price,quantity, image } = product

            return { _id,category,subcategory,title, description,price,quantity, image }
    
        })
}


