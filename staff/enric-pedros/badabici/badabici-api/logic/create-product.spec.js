require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User, Product } } = require('badabici-data')
const { expect } = require('chai')
const { random } = Math
const createProduct = require('./create-product')
const bcrypt = require('bcryptjs')
const { ContentError, NotAllowedError } = require('badabici-errors')

describe('createProduct', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => Promise.all([User.deleteMany(), Product.deleteMany()]))
    )

    let category, subcategory, title, description, price, image, quantity, discount, _id
    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}`
        password = `password-${random()}`
        role = 'superadmin'

        category = 'bicicleta'
        subcategory = 'montaña'
        title = 'orbea'
        description = 'de aluminio'
        price = '1000'
        image = 'abcd'
        quantity = '20'
        discount = 10

        return bcrypt.hash(password, 10)
            .then((password) => User.create({ name, surname, email, password, role }))
            .then((user) => _id = user.id)
    })

    it('should succeed on correct data', async () => {
        const product = await createProduct(_id, category, subcategory, title, description, price, image, quantity, discount)
        expect(product).not.to.exist

        return User.findById(_id)
            .then(user => {
                expect(user.role).to.equal('superadmin')
            })
            .then(() => {

                return Product.findOne({ title: 'orbea' })
                    .then((product) => {

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

    })

    it('should fail on wrong user id', async () => {

        const wrongId = 'juhygt567hyg'

        try {
            await createProduct(wrongId, category, subcategory, title, description, price, image, quantity, discount)

            throw Error('should not reach this point')

        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(NotAllowedError)
            expect(error.message).to.equal(`this user ${wrongId} is not the superadmin`)
        }
    })

    it('should fail on incorrect category, subcategory, title, description, or expression type and content', () => {


        expect(() => createProduct(category, 1)).to.throw(TypeError, '1 is not a string')
        expect(() => createProduct(category, true)).to.throw(TypeError, 'true is not a string')
        expect(() => createProduct(category, [])).to.throw(TypeError, ' is not a string')
        expect(() => createProduct(category, {})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => createProduct(category, undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => createProduct(category, null)).to.throw(TypeError, 'null is not a string')

        expect(() => createProduct(category, '')).to.throw(ContentError, 'category is empty')
        expect(() => createProduct(category, ' \t\r')).to.throw(ContentError, 'category is empty')

        expect(() => createProduct(category, subcategory, 1)).to.throw(TypeError, '1 is not a string')
        expect(() => createProduct(category, subcategory, true)).to.throw(TypeError, 'true is not a string')
        expect(() => createProduct(category, subcategory, [])).to.throw(TypeError, ' is not a string')
        expect(() => createProduct(category, subcategory, {})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => createProduct(category, subcategory, undefined)).to.throw(TypeError, 'undefined is not a string')


        expect(() => createProduct(category, subcategory, title, 1)).to.throw(TypeError, '1 is not a string')
        expect(() => createProduct(category, subcategory, title, true)).to.throw(TypeError, 'true is not a string')
        expect(() => createProduct(category, subcategory, title, [])).to.throw(TypeError, ' is not a string')
        expect(() => createProduct(category, subcategory, title, {})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => createProduct(category, subcategory, title, undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => createProduct(category, subcategory, title, null)).to.throw(TypeError, 'null is not a string')


        expect(() => createProduct(category, subcategory, title, description, '')).to.throw(ContentError, 'description is empty')
        expect(() => createProduct(category, subcategory, title, description, ' \t\r')).to.throw(ContentError, 'description is empty')
    })


    after(() => Promise.all([User.deleteMany(), Product.deleteMany()]).then(() => mongoose.disconnect()))
})