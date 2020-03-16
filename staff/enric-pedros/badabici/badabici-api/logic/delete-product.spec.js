require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User, Product } } = require('badabici-data')
const { expect } = require('chai')
const { random } = Math
const deleteProduct = require('./delete-product')

describe('deleteProduct', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => Promise.all([User.deleteMany(), Product.deleteMany()]))
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
            Promise.all([User.create({ name, surname, email, password,role }), Product.create({category, subcategory, title, description, price, image, quantity, discount}) ])
                .then(([user, product]) => {
                    _id = user.id
                    _idproduct = product.id
                    user.save()
                    return product.save()
                })
                .then(() => {})
                )
                
        
        it('should fail if the drug does not exist', () => {
            _idproduct = `${_idproduct}-wrong`
            deleteProduct(_id, _idproduct)
                .then(()=> {throw new Error ('should not reach this point')})
                .catch(({message })=> {
                    expect(message).to.exist
                    
                    expect(message).to.equal(`drug with name ${_idproduct} not found`)
                    
                })
        })

        it('should succeed on correct and valid and right data', () =>
            User.findById(_id).lean()
                .then((user) => {
                    expect(user._id).to.exist
                })

            .then( () => deleteProduct(_id, _idproduct)
                .then(() => User.findById(_id).lean() )
                .then((user) => {
                    expect(user).to.exist
                    expect(user._idproduct).to.be.undefined
                })
            )
        )


    })

    describe('unhappy path', () => {
  
        it('should fail on a non-string id', () => {
            let id
            
            id = 12345
            expect(() => deleteProduct(id, _idproduct)).to.throw(TypeError, `id ${id} is not a string`)
            debugger
            id = false
            expect(() => deleteProduct(id, _idproduct)).to.throw(TypeError, `id ${id} is not a string`)
            
            id = undefined
            expect(() => deleteProduct(id, _idproduct)).to.throw(TypeError, `id ${id} is not a string`)
            
            id = []
            expect(() => deleteProduct(id, _idproduct)).to.throw(TypeError, `id ${id} is not a string`)

        })

        it('should fail on a non-string idproduct', () => {
            _idproduct = 12345
            expect(() => deleteProduct(_id, _idproduct)).to.throw(TypeError, `productId ${_idproduct} is not a string`)
            
            _idproduct = false
            expect(() => deleteProduct(_id, _idproduct)).to.throw(TypeError, `productId ${_idproduct} is not a string`)
            
            _idproduct = undefined
            expect(() => deleteProduct(_id, _idproduct)).to.throw(TypeError, `productId ${_idproduct} is not a string`)
            
            _idproduct = []
            expect(() => deleteProduct(_id, _idproduct)).to.throw(TypeError, `productId ${_idproduct} is not a string`)
        })
    })


    after(() => Promise.all([User.deleteMany(), Product.deleteMany()]).then(() => mongoose.disconnect()))
})