require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User, Product } } = require('badabici-data')
const { expect } = require('chai')
const { random } = Math
const modifyProduct = require('./modify-product')
const bcrypt = require('bcryptjs')
const { ContentError, NotAllowedError } = require('badabici-errors')



describe('modifyProduct', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany())
            .then(() => Product.deleteMany())
    )

    let name, surname, email, password, category, subcategory, title, description, price, image, quantity, discount

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
    })
    describe('when user already exists', () => {

        beforeEach(() =>
            Promise.all([User.create({ name, surname, email, password, role }), Product.create({ category, subcategory, title, description, price, image, quantity, discount })])
                .then(([user, product]) => {
                    _id = user.id
                    _idproduct = product.id
                    user.save()
                    return product.save()
                })
                .then(() => { })
        )


        it('should fail if the product does not exist', () => {
            _idproduct = `${_idproduct}-wrong`
            modifyProduct(_id, _idproduct)
                .then(() => { throw new Error('should not reach this point') })
                .catch(({ message }) => {
                    expect(message).to.exist

                    expect(message).to.equal(`product with name ${_idproduct} not found`)

                })
        })
        it('should not return nothing if the product does exists', () => {

            modifyProduct(_id, _idproduct)
                .then(() => { throw new Error('should not reach this point') })
                .catch(({ message }) => {
                    expect(message).to.exist
                })
        })
    })
    after(() => Promise.all([User.deleteMany(), Product.deleteMany()]).then(() => mongoose.disconnect()))
})