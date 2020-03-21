require('dotenv').config()

const { mongoose, models: { User, Event, CreditCard } } = require('badabici-data')
const { env: { TEST_MONGODB_URL } } = process
const { random } = Math

    ; (async () => {
        await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

        await User.deleteMany()

        const users = []

        for (let i = 0; i < 10; i++) {
            const name = `name-${random()}`,
                surname = `surname-${random()}`,
                email = `email-${random()}-${i}@mail.com`,
                password = `password-${random()}`

            users.push({ name, surname, email, password })
        }

        const _users = await User.create(users)

        const [user] = _users

        const events = []

        for (let i = 0; i < 10; i++) {
            const title = `title-${random()}-${i}`,
                description = `description-${random()}`,
                date = new Date,
                location = `location-${random()}`

            events.push({ title, description, date, location, publisher: user.id })
        }

        const _events = await Event.create(events)

        user.published.push(..._events.map(({ id }) => id))

        await user.save()

        const __users = await User.find().lean()

        debugger

        const ___users = await User.find().populate('published', 'title date').lean()

        debugger

        const creditCard = new CreditCard({ number: '1234123412341234', expiration: new Date, cvv: '019' })

        user.creditCards.push(creditCard)

        await user.save()

        const _user = await User.findById(user.id).lean()

        debugger

        await mongoose.disconnect()
    })()