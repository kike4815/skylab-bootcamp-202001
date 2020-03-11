const { validate } = require('badabici-utils')
const { models: { User, Product } } = require('badabici-data')
const { NotAllowedError, NotFoundError } = require('badabici-errors')

module.exports = async (id, productId, data) => {
    validate.string(productId, 'productId')
    validate.string(id, 'id')

    for (let key in data) {
        validate.string(data[key], `${key}`)
    }

    const user = await User.findById(id)
    
    if (!user) throw new NotFoundError('user does not exist')
    if (user.role !== 'superadmin') throw new NotAllowedError(`this user is not the superadmin`)
    
    const product = await Product.findByIdAndUpdate(productId)

    if (!product) throw new NotFoundError(`this product doesn't exist`)


    // await Product.updateOne({ productId }, { data })
    // Product.updateOne({productId},{$set : data} )

    // .then(() => { })
    return

}