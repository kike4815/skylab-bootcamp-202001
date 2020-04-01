require('dotenv').config()

import context from './context'
const { mongoose, models: { User, Product } } = require('badabici-data')
const { random } = Math
const {addcart} = require('.')
const bcrypt = require('bcryptjs')
const { ContentError, NotAllowedError } = require('badabici-errors')
const jwt = require('jsonwebtoken')


const { env: {
    REACT_APP_TEST_MONGODB_URL: TEST_MONGODB_URL,
    REACT_APP_TEST_JWT_SECRET: TEST_JWT_SECRET
} } = process


describe.only('addcart', () => {
    beforeAll(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany())
            .then(() => Product.deleteMany())
    )

    let name, surname, email, password, category, subcategory, title, description, price, image, quantity, discount, role

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

    describe('when user already exists and wants add to buy', () => {
        
        let  _id, _idproduct

        beforeEach(() =>

        Promise.all([
            User.create({ name, surname, email, password }),
            Product.create({ category, subcategory, title, description, price, image, quantity, discount})
        ])
            .then(([{ id }, { id: idproduct }]) => {
                _id = id
                _idproduct = idproduct
                context.token = jwt.sign({ sub: _id }, TEST_JWT_SECRET)
            })

    )
        
        it('should succeed on correct with valid id and right credentials', () =>
            addcart(_idproduct)
                .then((result) => {
                    expect(result).toBeUndefined()
                })

        )
    })


    })
    describe('unhappy paths', () => {

        it('should fail on a non-string and non-valid id', () => {
            let id = 123456
            let idproduct = "5e6b69ebdc882b0b8c3b4d61"

            expect(() => addcart(idproduct)).toThrow(TypeError, `id ${id} is not a string`)

            id = false
            expect(() => addcart(idproduct)).toThrow(TypeError, `id ${id} is not a string`)

            id = undefined
            expect(() => addcart(idproduct)).toThrow(TypeError, `id ${id} is not a string`)

            id = []
            expect(() => addcart(idproduct)).toThrow(TypeError, `id ${id} is not a string`)


        })
        it('should fail on a non-string and non-valid id', () => {
            let id = "5e6b69ebdc882b0b8c3b4d61"
            let idproduct = 123456

            expect(() => addcart(idproduct)).toThrow(TypeError, `idproduct ${idproduct} is not a string`)

            idproduct = false
            expect(() => addcart(idproduct)).toThrow(TypeError, `idproduct ${idproduct} is not a string`)

            idproduct = undefined
            expect(() => addcart(idproduct)).toThrow(TypeError, `idproduct ${idproduct} is not a string`)

            idproduct = []
            expect(() => addcart(idproduct)).toThrow(TypeError, `idproduct ${idproduct} is not a string`)


        })



    afterAll(async () => {
        await Promise.resolve(User.deleteMany(), Product.deleteMany())
        return await mongoose.disconnect()
    })
})