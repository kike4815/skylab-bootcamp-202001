const { models: { Product } } = require('badabici-data')
const { validate } = require('badabici-utils')
const { NotFoundError, NotAllowedError } = require('badabici-errors')

module.exports = async function ()  {

        debugger
        const productsDiscount = await Product.find({discount: {$gte:10}}).lean()
        // const products = await Product.find().all('products',[query])
        debugger
        return await productsDiscount
        
            

}



