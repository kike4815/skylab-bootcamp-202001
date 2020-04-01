// const { random } = Math
// const { mongoose, models: { User } } = require('events-data')
// const { login } = require('.')
// const bcrypt = require('bcryptjs')
// //const context = require('./context').default
// import context from './context'

// const { env: { REACT_APP_TEST_MONGODB_URL: TEST_MONGODB_URL } } = process

// describe('login', () => {
//     beforeAll(() =>
//         mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//             .then(() => User.deleteMany())
//     )

//     let name, surname, email, password

//     beforeEach(() => {
//         name = `name-${random()}`
//         surname = `surname-${random()}`
//         email = `email-${random()}@mail.com`
//         password = `password-${random()}`
//     })

//     describe('when user already exists', () => {
//         let _id

//         beforeEach(async () => {
//             const _password = await bcrypt.hash(password, 10)

//             await User.create({ name, surname, email, password: _password })
//                 .then(user => _id = user.id)
//         })

//         it('should succeed on correct and valid and right credentials', () =>
//             login(email, password)
//                 .then(() => {
//                     const { token } = context

//                     expect(typeof token).toBe('string')
//                     expect(token.length).toBeGreaterThan(0)

//                     const { sub } = JSON.parse(atob(token.split('.')[1]))

//                     expect(sub).toBe(_id)
//                 })
//         )
//     })


//     afterAll(() => User.deleteMany().then(() => mongoose.disconnect()))
// })