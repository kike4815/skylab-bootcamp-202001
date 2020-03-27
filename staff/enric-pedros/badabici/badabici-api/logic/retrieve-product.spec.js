require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process

const { mongoose, models: { User, Product} } = require('badabici-data')
const { expect } = require('chai')
const { random } = Math
const { NotFoundError } = require('badabici-errors')
const retrieveProduct = require('./retrieve-product')

describe('retrieve product', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => Promise.all([User.deleteMany(), Product.deleteMany()]))
    )

    let name, surname, email, password, category, subcategory, title, description, price, image, quantity, discount, role, id, idProduct

    beforeEach( async () => {

        //data to create user

        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`

        role = 'superadmin'

        //data to create product

        category = `bicicleta-${random()}`
        subcategory = `montaña`
        title = `orbea`
        description = `abcdefghijk`
        price = `10*${random()}`
        image = `orbea.es`
        quantity = `20*${random()}`
        discount = 20

        //create user

        const user = await User.create({name, surname, email, password, role})

        id = user.id

        const product = await Product.create( { category, subcategory, title, description, price, image, quantity, discount} )

        idProduct = product.id

    })
    
    it('should succeed retrieving a single product', async ()=> {
        const product = await retrieveProduct(idProduct)
            expect(product).to.exist
            expect(product.category).to.equal(category)
            expect(product.subcategory).to.equal(subcategory)
            expect(product.title).to.equal(title)
            expect(product.description).to.equal(description)
            expect(product.price).to.equal(price)      
    
    })

    
    it('should fail on wrong product id', async () => {

        let wrongProductId = '293898iujuyh'
    
        try {
            await retrieveProduct(wrongProductId)
    
            throw Error('should not reach this point')

        } catch (error) {

            expect(error).to.exist
            expect(error).to.be.an.instanceOf(NotFoundError)
            expect(error.message).to.equal(`product with id ${wrongProductId} not found`)
        }
    })

    after(() => Promise.all([User.deleteMany(), Product.deleteMany()]).then(() => mongoose.disconnect()))

})