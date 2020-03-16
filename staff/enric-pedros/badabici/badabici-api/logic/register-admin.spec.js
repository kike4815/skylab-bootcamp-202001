require('dotenv').config()

const { expect } = require('chai')
const { random } = Math
const { mongoose, models: { User } } = require('badabici-data')
const registerAdmin = require('./register-admin')
const bcrypt = require('bcryptjs')

const { env: { TEST_MONGODB_URL } } = process

describe.only('registerUser', () => {
    let name, surname, email, password

    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany())
    )

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
        role = 'superadmin'
    })

    it('should succeed on correct user data', () =>
    registerAdmin(name, surname, email, password,role)
            .then(result => {
                expect(result).not.to.exist
                expect(result).to.be.undefined

                return User.findOne({ email })
            })
            .then(user => {
                expect(user).to.exist
                expect(user.id).to.be.a('string')
                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(email)

                return bcrypt.compare(password, user.password)
            })
            .then(validPassword => expect(validPassword).to.be.true)
    )
    describe('when user already exists', () => {
        beforeEach(() => User.create({ name, surname, email, username, password }))

        it('should fail on already existing user', async () => {
            try {
                await registerUser(name, surname, email, username, password)

                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist

                expect(error.message).to.exist
                expect(typeof error.message).to.equal('string')
                expect(error.message.length).to.be.greaterThan(0)
                expect(error.message).to.equal(`user with username ${username} already exists`)
            }
        })
    })

    it('should fail on incorrect name, surname, email, password, or expression type and content', () => {
        expect(() => registerAdmin(1)).to.throw(TypeError, '1 is not a string')
        expect(() => registerAdmin(true)).to.throw(TypeError, 'true is not a string')
        expect(() => registerAdmin([])).to.throw(TypeError, ' is not a string')
        expect(() => registerAdmin({})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => registerAdmin(undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => registerAdmin(null)).to.throw(TypeError, 'null is not a string')

        expect(() => registerAdmin('')).to.throw(ContentError, 'name is empty or blank')
        expect(() => registerAdmin(' \t\r')).to.throw(ContentError, 'name is empty or blank')

        expect(() => registerAdmin(name, 1)).to.throw(TypeError, '1 is not a string')
        expect(() => registerAdmin(name, true)).to.throw(TypeError, 'true is not a string')
        expect(() => registerAdmin(name, [])).to.throw(TypeError, ' is not a string')
        expect(() => registerAdmin(name, {})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => registerAdmin(name, undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => registerAdmin(name, null)).to.throw(TypeError, 'null is not a string')

        expect(() => registerAdmin(name, '')).to.throw(ContentError, 'surname is empty or blank')
        expect(() => registerAdmin(name, ' \t\r')).to.throw(ContentError, 'surname is empty or blank')

        expect(() => registerAdmin(name, surname, 1)).to.throw(TypeError, '1 is not a string')
        expect(() => registerAdmin(name, surname, true)).to.throw(TypeError, 'true is not a string')
        expect(() => registerAdmin(name, surname, [])).to.throw(TypeError, ' is not a string')
        expect(() => registerAdmin(name, surname, {})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => registerAdmin(name, surname, undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => registerAdmin(name, surname, null)).to.throw(TypeError, 'null is not a string')

        expect(() => registerAdmin(name, surname, '')).to.throw(ContentError, 'e-mail is empty or blank')
        expect(() => registerAdmin(name, surname, ' \t\r')).to.throw(ContentError, 'e-mail is empty or blank')

        expect(() => registerAdmin(name, surname, email, 1)).to.throw(TypeError, '1 is not a string')
        expect(() => registerAdmin(name, surname, email, true)).to.throw(TypeError, 'true is not a string')
        expect(() => registerAdmin(name, surname, email, [])).to.throw(TypeError, ' is not a string')
        expect(() => registerAdmin(name, surname, email, {})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => registerAdmin(name, surname, email, undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => registerAdmin(name, surname, email, null)).to.throw(TypeError, 'null is not a string')

        expect(() => registerAdmin(name, surname, email, '')).to.throw(ContentError, 'username is empty or blank')
        expect(() => registerAdmin(name, surname, email, ' \t\r')).to.throw(ContentError, 'username is empty or blank')

        expect(() => registerAdmin(name, surname, email, username, '')).to.throw(ContentError, 'password is empty or blank')
        expect(() => registerAdmin(name, surname, email, username, ' \t\r')).to.throw(ContentError, 'password is empty or blank')
    })


    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})