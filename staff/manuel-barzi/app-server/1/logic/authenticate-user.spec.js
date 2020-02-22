const authenticateUser = require('./authenticate-user')
const users = require('../data/users')

describe('authenticate', function () {
    let user

    beforeEach(function () {
        users.length = 0

        user = {
            name: 'name-' + Math.random(),
            surname: 'surname-' + Math.random(),
            username: 'username-' + Math.random(),
            password: 'password-' + Math.random()
        }
    })

    describe('when user already exists', function () {
        beforeEach(function () {
            users.push(user)
        })

        it('should succeed on correct credentials', function () {
            expect(function () {
                authenticateUser(user.username, user.password)
            }).not.toThrow()
        })

        it('should fail on incorrect credentials', function () {
            expect(function () {
                authenticateUser(user.username, user.password + '-wrong')
            }).toThrowError(Error, 'wrong credentials')

            expect(function () {
                authenticateUser(user.username + '-wrong', user.password)
            }).toThrowError(Error, 'wrong credentials')
        })
    })

    it('should fail when user does not exist', function () {
        expect(function () {
            authenticateUser(user.username, user.password)
        }).toThrowError(Error, 'wrong credentials')
    })

    afterEach(function () {
        users.length = 0
    })
})