const { validate } = require('badabici-utils')
const { models: { User, Product } } = require('badabici-data')
const { NotAllowedError, NotFoundError } = require('badabici-errors')

module.exports = (id, productId) => {
    validate.string(productId, 'productId')

    return User.findById(id)
        .then(user => {
            
            if (!user) throw new NotFoundError('user does not exist')
            if (user.role !== 'superadmin') throw new NotAllowedError(`this user is not the superadmin`)

            return Product.findByIdAndRemove(productId)
        })

        .then(() => { })

}