require('dotenv').config()

const { expect } = require('chai')
const { random } = Math
const { database, database: { ObjectId } } = require('../data')
const { registerUser } = require('../logic')

const { env: { TEST_MONGODB_URL } } = process

describe('registerUser', () => {
    let name, surname, email, password, users

    before(() =>
        database.connect(TEST_MONGODB_URL)
            .then(() => users = database.collection('users'))
    )

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
    })

    it('should succeed on correct user data', () =>
        registerUser(name, surname, email, password)
            .then(result => {
                expect(result).not.to.exist
                expect(result).to.be.undefined

                return users.findOne({ email })
            })
            .then(user => {
                expect(user).to.exist
                expect(user._id).to.be.instanceOf(ObjectId)
                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(email)
                expect(user.password).to.equal(password) // TODO encrypt this field!
                expect(user.created).to.be.instanceOf(Date)
            })
    )

    // TODO unhappy paths and other happies if exist

    after(() => database.disconnect())
})