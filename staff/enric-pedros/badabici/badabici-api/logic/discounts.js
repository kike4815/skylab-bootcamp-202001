const { models: { Product } } = require('badabici-data')
const { NotFoundError } = require('badabici-errors')

module.exports = async function ()  {

        const productsDiscount = await Product.find({discount: {$gt:1}}).lean()
    
        if (!productsDiscount.length) throw new NotFoundError ('there are not sails by the moment')

        return await productsDiscount
        
            

}



