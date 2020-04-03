const { validate } = require('badabici-utils')
const { models: { User, Order,Product } } = require('badabici-data')
const { NotFoundError } = require('badabici-errors')

module.exports = (id) => {
    validate.string(id, 'id')

    let productId


    return (async () => {


        const retrievedUser = await User.findById(id)
        if(!retrievedUser) throw new NotFoundError(`user with id ${id} not found`)

        retrievedUser._id = id

        const { chart } = retrievedUser 


        const order = await new Order({
            user: id,
            products: chart
        })
        const user = await User.findById(id).populate("chart").lean()

        for (let i =0; i < user.chart.length; i++){
            
            productId = user.chart[i]._id 
            const product = await Product.findById(productId)
            product.quantity = product.quantity-1
            await product.save()
 
    
        }
        
         retrievedUser.chart = []


        const idorder= await Order.create(order)

        let neworderofuser = await retrievedUser.orders  

        await neworderofuser.push(idorder)

        retrievedUser.save()
        
        return 
    })()


}