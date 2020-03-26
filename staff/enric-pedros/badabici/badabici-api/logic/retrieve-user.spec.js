require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { expect } = require('chai')
const { random } = Math
const retrieveUser = require('./retrieve-user')
const { mongoose, NotFoundError, models: { User } } = require('badabici-data')

describe('retrieveUser', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany())
    )

    let name, surname, email, password, users

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
    })

    describe('when user already exists', () => {
        let _id

        beforeEach(() =>
            User.create({ name, surname, email, password })
                .then(({ id }) => _id = id)
        )

        it('should succeed on correct and valid and right data', () =>
            retrieveUser(_id)
                .then(user => {
                    expect(user.constructor).to.equal(Object)
                    expect(user.name).to.equal(name)
                    expect(user.surname).to.equal(surname)
                    expect(user.email).to.equal(email)
                    expect(user.password).to.be.undefined
                })
        )

        it('should succeed on wrong data', () => {

            const wrongId = 'fhtujyi78uyi'

            retrieveUser(wrongId)
                .then(user => {
                    expect(user).to.not.exist

                })
                .catch((error) => {

                    expect(error).to.exist
                    expect(error.message).to.exist
                    expect(error).to.be.instanceOf(NotFoundError)
                    expect(error.message.length).to.be.greaterThan(0)
                    expect(error.message).to.equal(`user with email ${email} does not exist`)
                })
        })
    })


    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})