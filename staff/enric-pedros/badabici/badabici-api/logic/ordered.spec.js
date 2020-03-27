require('dotenv').config()

const { expect } = require('chai')
const { random } = Math
const { mongoose, models: { User, Product } } = require('badabici-data')
const buyit = require('./ordered')
const { ContentError, NotAllowedError } = require('badabici-errors')
const { env: { TEST_MONGODB_URL } } = process

describe('ordered', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => Promise.all([User.deleteMany(), Product.deleteMany()]))
    )

    describe('buyit', () => {
        let name, surname, email, password, category, subcategory, title, description, price, image, quantity, discount

        beforeEach(() => {
            name = `name-${random()}`
            surname = `surname-${random()}`
            email = `email-${random()}@mail.com`
            password = `password-${random()}`

            category = `bicicleta-${random()}`
            subcategory = `montaña`
            title = `orbea`
            description = `abcdefghijk`
            price = `10*${random()}`
            image = `orbea.es`
            quantity = `20*${random()}`
            discount = 20
        })
        describe('when user and product already exists', () => {

            beforeEach(() =>
                Promise.all([User.create({ name, surname, email, password }), Product.create({ category, subcategory, title, description, price, image, quantity, discount })])
                    .then(([user, product]) => {
                        _id = user.id
                        _idproduct = product.id
                        user.save()
                        return product.save()
                    })
                    .then(() => { })
            )

        })
        after(() => Promise.all([User.deleteMany(), Product.deleteMany()]).then(() => mongoose.disconnect()))
    })           
})