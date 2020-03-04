require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User, Event } } = require('events-data')
const { Types: { ObjectId } } = mongoose
const { expect } = require('chai')
const { random } = Math
const subscribeEvent = require('./subscribe-event')

describe('subscribeEvent', () => {
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
        let _id, _eventId, publisher

        beforeEach(() =>
            Promise.all([
                User.create({ name, surname, email, password }),
                Event.create({ title, description, date, location, publisher: publisher = new ObjectId })
            ])
                .then(([{ id }, { id: eventId }]) => {
                    _id = id
                    _eventId = eventId
                })
        )

        it('should succeed on correct and valid and right data', () =>
            subscribeEvent(_id, _eventId)
                .then(() =>
                    Promise.all([
                        User.findById(_id),
                        Event.findById(_eventId)
                    ])
                )
                .then(([user, event]) => {
                    expect(user).to.exist
                    expect(user.subscribed).to.contain(event._id)
                    expect(event).to.exist
                    expect(event.title).to.equal(title)
                    expect(event.description).to.equal(description)
                    expect(event.date).to.deep.equal(date)
                    expect(event.location).to.equal(location)
                    expect(event.publisher.toString()).to.equal(publisher.toString())
                    expect(event.subscribed).to.contain(user._id)
                })
        )
    })

    // TODO more happies and unhappies

    after(() => Promise.all([User.deleteMany(), Event.deleteMany()]).then(() => mongoose.disconnect()))
})