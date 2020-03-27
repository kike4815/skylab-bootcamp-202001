const { models: { Product } } = require('badabici-data')
const { NotAllowedError } = require('badabici-errors')
const { validate } = require('badabici-utils')

module.exports = function (query)  {
    if (!(query instanceof Object)) throw new NotAllowedError ('the query is not an Object')
    let filter = {}

    const {query: _query} = query

   
    if(_query) {
        validate.string(_query, 'query')
        filter={
            $or:[

            {category: { $regex: _query }},
            {title: { $regex: _query }},
            {subcategory: { $regex: _query }},
            {description: { $regex: _query }},
            {price: { $regex: _query }}]
        } 

    }else{

        for (const keys in query) {
            if (typeof query[keys] !== 'undefined') {
                validate.string(query[keys], `${query[keys]}`)
                filter[keys] = { $regex: query[keys] }
            }
        }
    }


    if(Object.keys(filter).length === 0){

        return (async () => {
            
            const products = await Product.find().lean()
            debugger
            return products
        })()
    }
    else{
        return (async () => {
            
            const products = await Product.find(filter).lean()
        
            return products
        })()
        
    }
}