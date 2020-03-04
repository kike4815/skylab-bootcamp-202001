require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const mongoose = require('mongoose')
const { expect } = require('chai')
const { random } = Math
const retrievePublishedEvents = require('./retrieve-published-events')
const { models: { User, Event } } = require('../data')

describe('retrievePublishedEvents', () => {
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
        let _id, _other

        beforeEach(() =>
            User.insertMany([
                { name, surname, email, password },
                { name, surname, email, password }
            ])
                .then(([{ id }, { id: other }]) => {
                    _id = id
                    _other = other
                })
                .then(() => {
                    const events = []

                    const now = new Date

                    date = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate())

                    for (let i = 0; i < 20; i++)
                        events.push({ publisher: i < 10 ? _id : _other, title, description, date, location })

                    return Event.insertMany(events)
                })
        )

        it('should succeed on correct and valid and right data', () =>
            retrievePublishedEvents(_id)
                .then(events => {
                    expect(events).to.exist
                    expect(events).to.have.lengthOf(10)

                    events.forEach(event => {
                        expect(event.id).to.be.a('string')
                        expect(event._id).to.be.undefined
                        expect(event.title).to.equal(title)
                        expect(event.description).to.equal(description)
                        expect(event.date).to.deep.equal(date)
                        expect(event.location).to.equal(location)
                        expect(event.publisher).to.be.a('string')
                        expect(event.publisher).to.equal(_id)
                    })
                })
        )
    })

    // TODO more happies and unhappies

    after(() => Promise.all([User.deleteMany(), Event.deleteMany()]).then(() => mongoose.disconnect()))
})