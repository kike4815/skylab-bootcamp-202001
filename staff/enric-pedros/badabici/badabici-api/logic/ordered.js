const { validate } = require('badabici-utils')
const { models: { User, Order,Product } } = require('badabici-data')
const { NotFoundError } = require('badabici-errors')

module.exports = (id) => {
    validate.string(id, 'id')

    return (async () => {


        const retrievedUser = await User.findById(id)

        retrievedUser._id = id

        const { chart } = retrievedUser


        const order = await new Order({
            user: id,
            products: chart
        })
        const user = await User.findById(id).populate("chart").lean()


        const { _id, quantity} = user.chart[0] 
        
        const modproduct = await Product.findById(_id) // como descontamos de la base de datos en funcion de la cantidad del usuario?


        retrievedUser.chart = []

        retrievedUser.save()

        const idorder= await Order.create(order)

        let neworderofuser = await retrievedUser.orders  

        await neworderofuser.push(idorder)

        retrievedUser.save()
        
        return 
    })()


}