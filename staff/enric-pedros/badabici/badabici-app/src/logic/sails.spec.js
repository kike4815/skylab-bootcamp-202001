// require('dotenv').config()
// const { env: { TEST_MONGODB_URL } } = process
// const { NotFoundError } = require('badabici-errors')
// const { mongoose, models: { Product } } = require('badabici-data')
// const fs = require('fs')
// const path = require('path')
// const { expect } = require('.')
// const discounts = require('./sails')


// describe('discounts', () => {
//     before(() =>
//         mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//             .then(() => Product.deleteMany())
//     )
//     let category, subcategory, title, description, price, image, quantity, discount

//     beforeEach(() => {

//         category = 'bicicleta'
//         subcategory = 'montaña'
//         title = 'orbea'
//         description = 'de aluminio'
//         price = '1000'
//         image = 'abcd'
//         quantity = '20'
//         discount = 15


//     })
//     beforeEach(() => Product.create({ category, subcategory, title, description, price, image, quantity, discount }))

//     it('should return a list of sails',  () => {
   
        
//             return discounts()
//            .then((results) =>{
               
//                expect(results).not.to.be.undefined
             
//            })
//     })        
//     after(async () => {
//         await Promise.resolve(Product.deleteMany())
//         return await mongoose.disconnect()
//     })
// })