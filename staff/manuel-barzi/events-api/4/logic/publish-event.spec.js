require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const mongoose = require('mongoose')
const { expect } = require('chai')
const { random } = Math
const publishEvent = require('./publish-event')
const { models: { User, Event } } = require('../data')

describe('publishEvent', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => Promise.all([User.deleteMany(), Event.deleteMany()]))
    )

    let name, surname, email, password, title, description, date, location

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
        title = `title-${random()}`
        description = `description-${random()}`
        date = new Date
        location = `location-${random()}`
    })

    describe('when user already exists', () => {
        let _id

        beforeEach(() =>
            User.create({ name, surname, email, password })
                .then(({ id }) => _id = id)
        )

        it('should succeed on correct and valid and right data', () =>
            publishEvent(_id, title, description, location, date)
                .then(() =>
                    Promise.all([
                        User.findById(_id),
                        Event.findOne({ title, description, location, date, publisher: _id })
                    ])
                )
                .then(([user, event]) => {
                    expect(user).to.exist
                    expect(user.published).to.contain(event._id)
                    expect(event).to.exist
                    expect(event.title).to.equal(title)
                    expect(event.description).to.equal(description)
                    expect(event.date).to.deep.equal(date)
                    expect(event.location).to.equal(location)
                    expect(event.publisher.toString()).to.equal(_id)
                })
        )
    })

    // TODO more happies and unhappies

    after(() => Promise.all([User.deleteMany(), Event.deleteMany()]).then(() => mongoose.disconnect()))
})