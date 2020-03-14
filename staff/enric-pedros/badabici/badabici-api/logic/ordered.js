const { validate } = require('badabici-utils')
const { models: { User, Order } } = require('badabici-data')
const { NotFoundError } = require('badabici-errors')

module.exports = async (id) => {
    validate.string(id, 'id')

    const retrievedUser = await User.findById(id)

    retrievedUser._id = id

    const {chart} = retrievedUser
    
    
    const order = await new Order ({
        user: id,
        products : chart
    }) 

    return await Order.create(order)
    
    // await delete retrievedUser.chart
    
    // await retrievedUser.updateOne({$pullAll : {chart:[]}})
    
    
}