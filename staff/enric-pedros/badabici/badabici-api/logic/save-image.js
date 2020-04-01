require('dotenv').config()
const { validate } = require('badabici-utils')
const { NotFoundError } = require('badabici-errors')
const { models: { User, Product } } = require('badabici-data')
const fs = require('fs')
const path = require('path')

/**
* Saves spot image
* 
* @param {ObjectId} userId of user
* @param {ObjectuserI} spotId id of spot
* @param {Stream} file data of the image
* @param {Sting} filename name of the image
*
* @returns {Promise} - user.  
*/


module.exports = function (userId, productId, file, filename) {
    validate.string(userId, 'userId')
    validate.string(productId, 'productId')
    // validate.string(filename, 'filename')
debugger
    return (async () => {
        const user = await User.findById(userId)
        if (!user) throw new NotFoundError(`user with id ${userId} not found`)

        const product = await Product.findById(productId)
        if (!product) throw new NotFoundError(`product with id ${productId} not found`)

        const dir = `./data/products/${productId}`
        if (!fs.existsSync(dir)) throw new NotFoundError(`folder in ${dir} hasn't been created yet`)

        product.image = filename
        await product.save()

        let saveTo = path.join(__dirname, `../data/products/${productId}/${filename}`)

        return file.pipe(fs.createWriteStream(saveTo))
    })()
}
