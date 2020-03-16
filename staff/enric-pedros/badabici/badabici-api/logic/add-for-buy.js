const { models: { Product, User } } = require('badabici-data')
const { mongoose: { Types: { ObjectId } } } = require('badabici-data')
const { validate } = require('badabici-utils')
const { NotFoundError } = require('badabici-errors')

module.exports =  (id, idproduct) => {
    validate.string(id, 'id')
    validate.string(idproduct, 'idproduct')

    return (async () => {
        const user = await User.findById(id)

        if (!user) throw new NotFoundError('the user does not exists')

        const product = await Product.findById(idproduct)

        if (!product) throw new NotFoundError('product does not exists')

        let usersorder = user.chart

        let indexoforder = usersorder.indexOf(idproduct)

        if (indexoforder !== -1) {
            await User.findByIdAndUpdate(id, { $pull: { chart: idproduct } })
        } else {
            await usersorder.push(idproduct)
        }
        user.save()
    })()
}