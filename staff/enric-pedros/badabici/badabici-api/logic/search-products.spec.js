require('dotenv').config()
const { env: { TEST_MONGODB_URL } } = process
const { NotAllowedError } = require('badabici-errors')
const { mongoose, models: { Product } } = require('badabici-data')
const { expect } = require('chai')
const searchProducts = require('./search-products')


describe('search', () => {

    before(() =>
    mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => Product.deleteMany())
    )

    let category, subcategory, title, description, price, image, quantity, discount, _id, _id2
    let category2, subcategory2, title2, description2, price2, image2, quantity2, discount2

    beforeEach(() => {
        
        category = 'bicicleta' 
        subcategory = 'montaña'
        title = 'orbea'
        description = 'de aluminio'
        price = '1000'
        image = 'abcd'
        quantity = '20'
        discount = 15
        
        category2 = 'bicicleta' 
        subcategory2 = 'montaña'
        title2 = 'orbea'
        description2 = 'de fibra de carbono'
        price2 = '1000'
        image2 = 'abcd'
        quantity2 = '20'
        discount2 = 15

    })
    beforeEach(() => {

        Product.create({ category, subcategory, title, description, price, image, quantity, discount })
        .then(({ id }) => _id = id)

        Product.create({ category: category2, subcategory: subcategory2, title: title2, description: description2, price: price2, image: image2, quantity: quantity2, discount: discount2 })

        .then(({ id }) => _id2 = id)

    })

    it('should return a list of products',  () => {debugger
        let query = {query: 'montaña' }
 
            return searchProducts(query)
            .then((results) =>{
              
                expect(results).not.to.be.undefined
                expect(results.length).to.equal(2) 

             
                results.forEach(result=>{
                    expect(result.subcategory).to.include('montaña')
                })
               
            })
    })

    it('should return a list of products',  () => {
        let query2 = {query: 'aluminio' }
 
            return searchProducts(query2)
            .then((results2) =>{
              
                expect(results2).not.to.be.undefined
                expect(results2.length).to.equal(2) 

             
                results2.forEach(result2=>{
                    expect(result2.description).to.include('aluminio')
                })
               
            })
    })

    it('should return a list of products',  () => {debugger
        const query = {query: '' }
 
            return searchProducts({})
            .then((results) =>{

                              
                expect(results).not.to.be.undefined

                //products.length???

                expect(results.length).to.equal(6) 

             
                results.forEach(result=>{
                    expect(result).to.be.constructor({})
                })
               
            })
    })

    it('should fail when the query is not an object', () =>{
        let query3 = '12345'

         searchProducts(query3 =>  expect(query3).to.throw(NotAllowedError, `the query is not an Object`))
    })
   
    after(() => Promise.all([Product.deleteMany()]).then(() => mongoose.disconnect()))
})