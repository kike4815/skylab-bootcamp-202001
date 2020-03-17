require('dotenv').config()

const { expect } = require('chai')
const { random } = Math
const { ContentError } = require('badabici-errors')
const { mongoose, models: { User } } = require('badabici-data')
const registerAdmin = require('./register-admin')
const bcrypt = require('bcryptjs')

const { env: { TEST_MONGODB_URL } } = process

describe('registerUser', () => {
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
        member = true
        role = 'superadmin'
    })

    it('should succeed on correct user data', () =>
    registerAdmin(name, surname, email, password,member,role)
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
        beforeEach(() => User.create({ name, surname, email, password }))

        it('should fail on already existing user', async () => {
            try {
                await registerAdmin(name, surname, email, password)

                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist

                expect(error.message).to.exist
                expect(typeof error.message).to.equal('string')
                expect(error.message.length).to.be.greaterThan(0)

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

        expect(() => registerAdmin('')).to.throw(ContentError, 'name is empty')
        expect(() => registerAdmin(' \t\r')).to.throw(ContentError, 'name is empty')

        expect(() => registerAdmin(name, 1)).to.throw(TypeError, '1 is not a string')
        expect(() => registerAdmin(name, true)).to.throw(TypeError, 'true is not a string')
        expect(() => registerAdmin(name, [])).to.throw(TypeError, ' is not a string')
        expect(() => registerAdmin(name, {})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => registerAdmin(name, undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => registerAdmin(name, null)).to.throw(TypeError, 'null is not a string')

        expect(() => registerAdmin(name, '')).to.throw(ContentError, 'surname is empty')
        expect(() => registerAdmin(name, ' \t\r')).to.throw(ContentError, 'surname is empty')

        expect(() => registerAdmin(name, surname, 1)).to.throw(TypeError, '1 is not a string')
        expect(() => registerAdmin(name, surname, true)).to.throw(TypeError, 'true is not a string')
        expect(() => registerAdmin(name, surname, [])).to.throw(TypeError, ' is not a string')
        expect(() => registerAdmin(name, surname, {})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => registerAdmin(name, surname, undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => registerAdmin(name, surname, null)).to.throw(TypeError, 'null is not a string')

        expect(() => registerAdmin(name, surname, '')).to.throw(ContentError, 'email is empty')
        expect(() => registerAdmin(name, surname, ' \t\r')).to.throw(ContentError, 'email is empty')

    })


    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})