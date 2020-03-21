const { models: { Product } } = require('badabici-data')
const { validate } = require('badabici-utils')
const { NotFoundError, NotAllowedError } = require('badabici-errors')

module.exports = function (query)  {
    if (!(query instanceof Object)) throw new NotAllowedError ('the query is not an Object')

    return (async () => {
    const {q} = query 
    const products = await Product.find({ 
        
        $or: [
            { category: { $regex: q} },
            { subcategory: { $regex: q} },
            { description: { $regex: q} },
            { price: { $regex: q}}
        ]
    }).lean()

    return products
    
       

    })()
}


