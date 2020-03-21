require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { Product,User } } = require('badabici-data')
const { expect } = require('chai')
const retrieveProduct = require('./retrieve-product')
const registerAdmin = require('./register-admin')
const createProduct = require('./create-product')
const { ContentError, NotAllowedError } = require('badabici-errors')
const {random} = Math

describe('createProduct', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => Promise.all([Product.deleteMany()]))
    )

    let category, subcategory, title, description, price, image, quantity, discount, _id, userId
    beforeEach(() => {

        category = `bicicleta-${random()}`
        subcategory = 'montaña'
        title = 'orbea'
        description = 'de aluminio'
        price = '1000'
        image = 'abcd'
        quantity = '20'
        discount = 10

    })
    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
        member = true
        role = 'superadmin'

    })
    it('should succeed on correct user data', () =>
    registerAdmin(name, surname, email, password, member,role)
            .then(() => {

                return User.findOne({ email })
            })
            .then(user => {
                userId = user.id
            })


    )

    it('should succeed on correct query', async () => {
        
         await createProduct(userId,category, subcategory, title, description, price, image, quantity, discount)
        const productsearch = await Product.findOne( {"category" : category})
        debugger
        return retrieveProduct(productsearch.id)
        .then((product) => {
            debugger
            _id = product.id
            
                expect(_id).to.exist
                expect(_id).to.be.a('string')

                expect(product).to.exist
                expect(product).to.be.an.instanceof(Object)
                expect(product.title).to.equal('orbea')
                expect(product.description).to.equal(description)
                expect(product.category).to.exist
                expect(product.subcategory).to.be.a('String')
                expect(product.price).to.equal('1000')
                expect(product.image).to.equal('abcd')
                expect(product.quantity).to.equal(quantity)
                expect(product.discount).to.equal(discount)


            })

    })
    after(() => Product.deleteMany().then(() => mongoose.disconnect()))
})