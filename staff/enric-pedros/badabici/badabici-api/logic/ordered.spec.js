require('dotenv').config()

const { expect } = require('chai')
const { random } = Math
const { mongoose, models: { User, Product } } = require('badabici-data')
const buyit = require('./ordered')
const { NotFoundError } = require('badabici-errors')
const { env: { TEST_MONGODB_URL } } = process

describe('ordered', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => Promise.all([User.deleteMany(), Product.deleteMany()]))
    )

    describe('ordered', () => {
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
        describe('when user already exists', () => {

            beforeEach(() =>
                Promise.all([User.create({ name, surname, email, password }), Product.create({ category, subcategory, title, description, price, image, quantity, discount })])
                    .then(([user, product]) => {
                        _id = user.id
                        _idproduct = product.id
                        user.chart.push(_idproduct)
                        user.save()
                        return product.save()
                    })
                    .then(() => { })
            )

            it('should succeed on correct and valid and right data', () =>
                User.findById(_id).lean()
                    .then((user) => {
                        expect(user._id).to.exist
                    })

                    .then(() => buyit(_id)

                        .then((response) => {
                            expect(response).to.not.exist
                        })
                    )
            )



        })

        describe('when user does not exist', () => {

            beforeEach(() =>
                Promise.all([User.create({ name, surname, email, password }), Product.create({ category, subcategory, title, description, price, image, quantity, discount })])
                    .then(([user, product]) => {
                        _id = user.id
                        _idproduct = product.id
                        user.chart.push(_idproduct)
                        user.save()
                        return product.save()
                    })
                    .then(() => { })
            )

            it('should succeed on correct and valid and right data', () => {debugger

                const wrongId = 'perftgy876yh'

                User.findById(wrongId).lean()
                    .then((user) => {
                        expect(user).to.not.exist
                    })

                    .then(() => buyit(wrongId)

                        .then((response) => {
                            expect(response).to.not.exist
                        })
                        .catch((error) => {
                            expect(error).to.exist
                            expect(error).to.be.instanceof(NotFoundError)
                            expect(error.message).to.equal(`user with id ${wrongId} not found`)
                        }
                        )
                    )
            })



        })
        after(() => Promise.all([User.deleteMany(), Product.deleteMany()]).then(() => mongoose.disconnect()))
    })
})