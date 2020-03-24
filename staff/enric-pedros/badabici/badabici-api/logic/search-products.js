const { models: { Product } } = require('badabici-data')
const { NotAllowedError } = require('badabici-errors')
const { validate } = require('badabici-utils')

module.exports = function (query)  {
    if (!(query instanceof Object)) throw new NotAllowedError ('the query is not an Object')
    const {category, title, subcategory, description, price} = query
    let filter = {}

    for (const keys in query) {
        if (typeof query[keys] !== 'undefined') {
            validate.string(query[keys], `${query[keys]}`)
            filter[keys] = { $regex: query[keys] }
        }
    }

    return (async () => {
        const products = await Product.find(filter).lean()
        return products
    })()
}