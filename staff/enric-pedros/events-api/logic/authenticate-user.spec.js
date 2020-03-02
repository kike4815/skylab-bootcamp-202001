require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { database, models: { User } } = require('../data')
const { expect } = require('chai')
const { random } = Math
const authenticateUser = require('./authenticate-user')

describe('authenticateUser', () => {
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
        let _id

        beforeEach(() =>
            users.insertOne(new User({ name, surname, email, password }))
                .then(({ insertedId }) => _id = insertedId)
        )

        it('should succeed on correct and valid and right credentials', () =>
            authenticateUser(email, password)
                .then(id => {
                    expect(id).to.be.a('string')
                    expect(id.length).to.be.greaterThan(0)
                    expect(id).to.equal(_id.toString())
                })
        )
    })

    // TODO more happies and unhappies

    after(() => database.disconnect())
})