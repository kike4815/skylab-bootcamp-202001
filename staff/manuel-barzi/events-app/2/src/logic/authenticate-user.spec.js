const { random } = Math
const { mongoose, models: { User } } = require('events-data')
const { authenticateUser } = require('.')

const { env: { REACT_APP_TEST_MONGODB_URL: TEST_MONGODB_URL } } = process

describe('authenticateUser', () => {
    beforeAll(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany())
    )

    let name, surname, email, password

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
                .then(user => _id = user.id)
        )

        it('should succeed on correct and valid and right credentials', () =>
            authenticateUser(email, password)
                .then(token => {
                    expect(typeof token).toBe('string')
                    expect(token.length).toBeGreaterThan(0)

                    const { sub } = JSON.parse(atob(token.split('.')[1]))

                    expect(sub).toBe(_id)
                })
        )
    })

    // TODO more happies and unhappies

    afterAll(() => User.deleteMany().then(() => mongoose.disconnect()))
})