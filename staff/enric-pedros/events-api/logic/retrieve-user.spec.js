require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { database, models: { User } } = require('../data')
const { expect } = require('chai')
const { random } = Math
const retrieveUser = require('./retrieve-user')

describe('retrieveUser', () => {
    before(() =>
        database.connect(TEST_MONGODB_URL)
            .then(() => users = database.collection('users'))
    )

    let name, surname, email, password, users

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
    })

    describe('when user already exists', () => {
        let id

        beforeEach(() =>
            users.insertOne(new User({ name, surname, email, password }))
                .then(({ insertedId }) => id = insertedId.toString())
        )

        it('should succeed on correct and valid and right data', () =>
            retrieveUser(id)
                .then(user => {
                    expect(user.constructor).to.equal(Object)
                    expect(user.name).to.equal(name)
                    expect(user.surname).to.equal(surname)
                    expect(user.email).to.equal(email)
                    expect(user.password).to.be.undefined
                })
        )
    })

    // TODO more happies and unhappies

    after(() => database.disconnect())
})