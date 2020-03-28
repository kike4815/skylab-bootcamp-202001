require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User, Product } } = require('badabici-data')
const { expect } = require('chai')
const { random } = Math

const { NotFoundError } = require('badabici-errors')
const modifyProduct = require('./modify-product')

describe('modify product', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => Promise.all([User.deleteMany(), Product.deleteMany()]))
    )

    let name, surname, email, password, category, subcategory, title, description, price, image, quantity, discount, data

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
        role = 'superadmin'

        category = `bicicleta-${random()}`
        subcategory = `montaña`
        title = `orbea`
        description = `abcdefghijk`
        price = `10*${random()}`
        image = `orbea.es`
        quantity = `20*${random()}`
        discount = 20

        data = {

            category: `newCategory`,
            subcategory: `newSubcategory`,
            title: `newTitle`,
            description: `newDescription`,
            price: `newPrice`,
            image: `newImage`,
            quantity: `newQuantity`,

        }
    })

    describe('when user already exists', () => {

        beforeEach(() => {

            return Promise.all([User.create({ name, surname, email, password, role }), Product.create({ category, subcategory, title, description, price, image, quantity, discount })])

                .then(([user, product]) => {
                    _id = user.id
                    _idproduct = product.id
                    user.save()
                    return product.save()
                })


        })

        it('should succeed on correct and valid and right data', () =>
            User.findById(_id).lean()
                .then((user) => {
                    expect(user._id).to.exist
                })

                .then(() => modifyProduct(_id, _idproduct, data)
                    .then(() => Product.findById(_idproduct).lean())
                    .then((product) => {
                        expect(product).to.exist

                        expect(product.category).to.equal(data.category)
                        expect(product.subcategory).to.equal(data.subcategory)
                        expect(product.title).to.equal(data.title)
                        expect(product.price).to.equal(data.price)
                        expect(product.quantity).to.equal(data.quantity)
                    })
                )
        )

        it('should fail if the product does not exist', async () => {
            const wrongIdProduct = `4956yjugjy78`

            try {

                await modifyProduct(_id, wrongIdProduct, data)
                throw new Error('should not reach this point')

            } catch (error) {


                expect(error).to.exist
                expect(error).to.be.instanceof(NotFoundError)
                expect(error.message).to.equal(`product with id ${wrongIdProduct} not found`)
            }

        })




    })

    describe('unhappy path', () => {

        it('should fail on a non-string id', () => {
            let id

            id = 12345
            expect(() => modifyProduct(id, _idproduct, data)).to.throw(TypeError, `id ${id} is not a string`)

            id = false
            expect(() => modifyProduct(id, _idproduct, data)).to.throw(TypeError, `id ${id} is not a string`)

            id = undefined
            expect(() => modifyProduct(id, _idproduct, data)).to.throw(TypeError, `id ${id} is not a string`)

            id = []
            expect(() => modifyProduct(id, _idproduct, data)).to.throw(TypeError, `id ${id} is not a string`)

        })

        it('should fail on a non-string idproduct', () => {
            _idproduct = 12345
            expect(() => modifyProduct(_id, _idproduct, data)).to.throw(TypeError, `productId ${_idproduct} is not a string`)

            _idproduct = false
            expect(() => modifyProduct(_id, _idproduct, data)).to.throw(TypeError, `productId ${_idproduct} is not a string`)

            _idproduct = undefined
            expect(() => modifyProduct(_id, _idproduct, data)).to.throw(TypeError, `productId ${_idproduct} is not a string`)

            _idproduct = []
            expect(() => modifyProduct(_id, _idproduct, data)).to.throw(TypeError, `productId ${_idproduct} is not a string`)
        })
    })



    after(() => Promise.all([User.deleteMany(), Product.deleteMany()]).then(() => mongoose.disconnect()))
})