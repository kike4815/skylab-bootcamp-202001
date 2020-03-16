const { models: { Product } } = require('badabici-data')
const { validate } = require('badabici-utils')
const { NotFoundError, NotAllowedError } = require('badabici-errors')

module.exports = function (query)  {

        if (!(query instanceof Object)) throw new NotAllowedError ('the query is not an Object')
    return (async () => {
        // En cas de fer servir req.body
        // // const product = {}
        // for (const key in body){
        //     product[key] = body[key]
        // }

        
        const products = await Product.find(query).lean()
        // const products = await Product.find().all('products',[query])

        return products
        
            

    })()
}


