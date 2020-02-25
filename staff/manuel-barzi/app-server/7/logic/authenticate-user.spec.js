const { authenticateUser } = require('.')
const { call } = require('../utils')

describe('authenticateUser', () => {
    let name, surname, username, password

    beforeEach(() => {
        name = 'name-' + Math.random()
        surname = 'surname-' + Math.random()
        username = 'username-' + Math.random()
        password = 'password-' + Math.random()
    })

    describe('when user already exists', () => {
        beforeEach(done =>
            call(`https://skylabcoders.herokuapp.com/api/v2/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, surname, username, password })
            }, (error, response) => {
                if (error) return done(error)

                if (response.content) {
                    const { error } = JSON.parse(response.content)

                    if (error) return done(new Error(error))
                }

                done()
            })
        )

        it('should succeed on correct credentials', done =>
            authenticateUser(username, password, (error, token) => {
                expect(error).toBeUndefined()

                expect(token).toBeA('string')

                const [header, payload, signature] = token.split('.')
                expect(header.length).toBeGreaterThan(0)
                expect(payload.length).toBeGreaterThan(0)
                expect(signature.length).toBeGreaterThan(0)

                done()
            })
        )

        it('should fail on incorrect password', done => {
            authenticateUser(username, `${password}-wrong`, (error, token) => {
                expect(error).toBeInstanceOf(Error)
                expect(error.message).toBe('username and/or password wrong')

                expect(token).toBeUndefined()

                done()
            })
        })

        it('should fail on incorrect username', done => {
            authenticateUser(`${username}-wrong`, password, (error, token) => {
                expect(error).toBeInstanceOf(Error)
                expect(error.message).toBe('username and/or password wrong')

                expect(token).toBeUndefined()

                done()
            })
        })

        afterEach(done => {
            call(`https://skylabcoders.herokuapp.com/api/v2/users/auth`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            }, (error, response) => {
                if (error) return done(error)

                const { error: _error, token } = JSON.parse(response.content)

                if (_error) return done(new Error(_error))

                call(`https://skylabcoders.herokuapp.com/api/v2/users`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ password })
                }, (error, response) => {
                    if (error) return done(error)

                    if (response.content) {
                        const { error } = JSON.parse(response.content)

                        if (error) return done(new Error(error))
                    }

                    done()
                })
            })
        })
    })

    it('should fail when user does not exist', done => {
        authenticateUser(username, password, error => {
            expect(error).toBeInstanceOf(Error)
            expect(error.message).toBe('username and/or password wrong')

            done()
        })
    })

    it('should fail on non-string username', () => {
        username = 1
        expect(() =>
            authenticateUser(username, password, () => { })
        ).toThrowError(TypeError, `username ${username} is not a string`)

        username = true
        expect(() =>
            authenticateUser(username, password, () => { })
        ).toThrowError(TypeError, `username ${username} is not a string`)

        username = undefined
        expect(() =>
            authenticateUser(username, password, () => { })
        ).toThrowError(TypeError, `username ${username} is not a string`)
    })

    it('should fail on non-string password', () => {
        password = 1
        expect(() =>
            authenticateUser(username, password, () => { })
        ).toThrowError(TypeError, `password ${password} is not a string`)

        password = true
        expect(() =>
            authenticateUser(username, password, () => { })
        ).toThrowError(TypeError, `password ${password} is not a string`)

        password = undefined
        expect(() =>
            authenticateUser(username, password, () => { })
        ).toThrowError(TypeError, `password ${password} is not a string`)
    })

    // TODO should fail on non-function callback
})