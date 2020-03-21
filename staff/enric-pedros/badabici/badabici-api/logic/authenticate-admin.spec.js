require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User } } = require('badabici-data')
const { expect } = require('chai')
const { random } = Math
const authenticateAdmin = require('./authenticate-admin')
const bcrypt = require('bcryptjs')
const { ContentError, NotAllowedError } = require('badabici-errors')



describe('authenticateAdmin', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany())
    )

    let name, surname, email, password,role

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
        role = 'superadmin'
    })

    describe('when user already exists', () => {
        let _id
        
        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(password =>
                    User.create({ name, surname, email, password,role })
                )
                .then(user => _id = user.id)
        )

        it('should succeed on correct and valid and right credentials', () =>
            authenticateAdmin(email, password)
                .then(id => {
                    expect(id).to.be.a('string')
                    expect(id.length).to.be.greaterThan(0)
                    expect(id).to.equal(_id)
                })
        )
        it('should fail on incorrect email', async () => {
            email = `email-${random()}@mail.com`

            try {
                await authenticateAdmin(email, password)

                throw new Error('you should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error.message).to.equal(`wrong credentials`)
            }
        })

        it('should fail on incorrect password', async () => {
            password = `password-${random()}`

            try {
                await authenticateAdmin(email, password)

                throw new Error('you should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error.message).to.equal(`wrong credentials`)
            }
        })
        it('should fail when user does not exist', async () => {
            email = `email-${random()}@mail.com`
            password = `password-${random()}`

            try {
                await authenticateAdmin(email, password)

                throw new Error('you should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error.message).to.equal(`wrong credentials`)
            }
        })



    })
    describe('unhappy paths', () => {

        it('should fail on a non-string and non-valid email', async () => {
            email = 123456

            expect(() => authenticateAdmin(email, password)).to.throw(TypeError, `email ${email} is not a string`)

            email = false
            expect(() => authenticateAdmin(email, password)).to.throw(TypeError, `email ${email} is not a string`)

            email = undefined
            expect(() => authenticateAdmin(email, password)).to.throw(TypeError, `email ${email} is not a string`)

            email = []
            expect(() => authenticateAdmin(email, password)).to.throw(TypeError, `email ${email} is not a string`)

            email = 'kfjsnfksdn'
            expect(() => authenticateAdmin(email, password)).to.throw(ContentError, `${email} is not an e-mail`)

            email = 'kfjsnfksdn@123'
            expect(() => authenticateAdmin(email, password)).to.throw(ContentError, `${email} is not an e-mail`)
        })

        it('should fail on a non-string password', () => {
            password = 9328743289
            expect(() => authenticateAdmin(email, password)).to.throw(TypeError, `password ${password} is not a string`)

            password = false
            expect(() => authenticateAdmin(email, password)).to.throw(TypeError, `password ${password} is not a string`)

            password = undefined
            expect(() => authenticateAdmin(email, password)).to.throw(TypeError, `password ${password} is not a string`)

            password = []
            expect(() => authenticateAdmin(email, password)).to.throw(TypeError, `password ${password} is not a string`)
        })

        it('should fail on incorrect email, password, or expression type and content', () => {
            expect(() => authenticateAdmin(1)).to.throw(TypeError, '1 is not a string')
            expect(() => authenticateAdmin(true)).to.throw(TypeError, 'true is not a string')
            expect(() => authenticateAdmin([])).to.throw(TypeError, ' is not a string')
            expect(() => authenticateAdmin({})).to.throw(TypeError, '[object Object] is not a string')
            expect(() => authenticateAdmin(undefined)).to.throw(TypeError, 'undefined is not a string')
            expect(() => authenticateAdmin(null)).to.throw(TypeError, 'null is not a string')
    
            expect(() => authenticateAdmin('')).to.throw(ContentError, 'email is empty')
            expect(() => authenticateAdmin(' \t\r')).to.throw(ContentError, 'email is empty')
    
            expect(() => authenticateAdmin(email, 1)).to.throw(TypeError, '1 is not a string')
            expect(() => authenticateAdmin(email, true)).to.throw(TypeError, 'true is not a string')
            expect(() => authenticateAdmin(email, [])).to.throw(TypeError, ' is not a string')
            expect(() => authenticateAdmin(email, {})).to.throw(TypeError, '[object Object] is not a string')
            expect(() => authenticateAdmin(email, undefined)).to.throw(TypeError, 'undefined is not a string')
            expect(() => authenticateAdmin(email, null)).to.throw(TypeError, 'null is not a string')
    
            expect(() => authenticateAdmin(email, '')).to.throw(ContentError, 'password is empty')
            expect(() => authenticateAdmin(email, ' \t\r')).to.throw(ContentError, 'password is empty')
        })

    })



    after(async () => {
        await Promise.resolve(User.deleteMany())
        return await mongoose.disconnect()
    })
})