require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User, Product } } = require('badabici-data')
const { expect } = require('chai')
const { random } = Math
const addForBuy = require('./add-for-buy.js')
const bcrypt = require('bcryptjs')
const { ContentError, NotAllowedError } = require('badabici-errors')



describe('addForBuy', () => {
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
            })

    )
        
        it('should succeed on correct with valid id and right credentials', () =>
            addForBuy(_id, _idproduct)
                .then((result) => {
                    expect(result).not.to.exist
                    expect(result).to.be.undefined
                })

        )
    })


    })
    describe('unhappy paths', () => {

        it('should fail on a non-string and non-valid id', () => {
            id = 123456
            idproduct = "5e6b69ebdc882b0b8c3b4d61"

            expect(() => addForBuy(id, idproduct)).to.throw(TypeError, `id ${id} is not a string`)

            id = false
            expect(() => addForBuy(id, idproduct)).to.throw(TypeError, `id ${id} is not a string`)

            id = undefined
            expect(() => addForBuy(id, idproduct)).to.throw(TypeError, `id ${id} is not a string`)

            id = []
            expect(() => addForBuy(id, idproduct)).to.throw(TypeError, `id ${id} is not a string`)


        })
        it('should fail on a non-string and non-valid id', () => {
            id = "5e6b69ebdc882b0b8c3b4d61"
            idproduct = 123456

            expect(() => addForBuy(id, idproduct)).to.throw(TypeError, `idproduct ${idproduct} is not a string`)

            idproduct = false
            expect(() => addForBuy(id, idproduct)).to.throw(TypeError, `idproduct ${idproduct} is not a string`)

            idproduct = undefined
            expect(() => addForBuy(id, idproduct)).to.throw(TypeError, `idproduct ${idproduct} is not a string`)

            idproduct = []
            expect(() => addForBuy(id, idproduct)).to.throw(TypeError, `idproduct ${idproduct} is not a string`)


        })

  

    //     it('should fail on incorrect email, password, or expression type and content', () => {
    //         expect(() => authenticateUser(1)).to.throw(TypeError, '1 is not a string')
    //         expect(() => authenticateUser(true)).to.throw(TypeError, 'true is not a string')
    //         expect(() => authenticateUser([])).to.throw(TypeError, ' is not a string')
    //         expect(() => authenticateUser({})).to.throw(TypeError, '[object Object] is not a string')
    //         expect(() => authenticateUser(undefined)).to.throw(TypeError, 'undefined is not a string')
    //         expect(() => authenticateUser(null)).to.throw(TypeError, 'null is not a string')

    //         expect(() => authenticateUser('')).to.throw(ContentError, 'email is empty')
    //         expect(() => authenticateUser(' \t\r')).to.throw(ContentError, 'email is empty')

    //         expect(() => authenticateUser(email, 1)).to.throw(TypeError, '1 is not a string')
    //         expect(() => authenticateUser(email, true)).to.throw(TypeError, 'true is not a string')
    //         expect(() => authenticateUser(email, [])).to.throw(TypeError, ' is not a string')
    //         expect(() => authenticateUser(email, {})).to.throw(TypeError, '[object Object] is not a string')
    //         expect(() => authenticateUser(email, undefined)).to.throw(TypeError, 'undefined is not a string')
    //         expect(() => authenticateUser(email, null)).to.throw(TypeError, 'null is not a string')

    //         expect(() => authenticateUser(email, '')).to.throw(ContentError, 'password is empty')
    //         expect(() => authenticateUser(email, ' \t\r')).to.throw(ContentError, 'password is empty')
    //     })

    // })



    after(async () => {
        await Promise.resolve(User.deleteMany(), Product.deleteMany())
        return await mongoose.disconnect()
    })
})