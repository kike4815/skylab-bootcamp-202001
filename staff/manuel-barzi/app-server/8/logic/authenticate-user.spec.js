const { authenticateUser } = require('.')
const { fetch } = require('../utils')
require('../specs/specs-helper')

describe('authenticateUser', () => {
    let name, surname, username, password

    beforeEach(() => {
        name = 'name-' + Math.random()
        surname = 'surname-' + Math.random()
        username = 'username-' + Math.random()
        password = 'password-' + Math.random()
    })

    describe('when user already exists', () => {
        beforeEach(() =>
            fetch(`https://skylabcoders.herokuapp.com/api/v2/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, surname, username, password })
            })
                .then(response => {
                    if (response.content) {
                        const { error } = JSON.parse(response.content)

                        if (error) throw new Error(error)
                    }
                })
        )

        it('should succeed on correct credentials', () =>
            authenticateUser(username, password)
                .then(token => {
                    expect(token).toBeA('string')

                    const [header, payload, signature] = token.split('.')
                    expect(header.length).toBeGreaterThan(0)
                    expect(payload.length).toBeGreaterThan(0)
                    expect(signature.length).toBeGreaterThan(0)
                })
        )

        it('should fail on incorrect password', () =>
            authenticateUser(username, `${password}-wrong`)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).toBeInstanceOf(Error)
                    expect(error.message).toBe('username and/or password wrong')
                })
        )

        it('should fail on incorrect username', () =>
            authenticateUser(`${username}-wrong`, password)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).toBeInstanceOf(Error)
                    expect(error.message).toBe('username and/or password wrong')
                })
        )

        afterEach(() =>
            fetch(`https://skylabcoders.herokuapp.com/api/v2/users/auth`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            })
                .then(response => {
                    const { error: _error, token } = JSON.parse(response.content)

                    if (_error) throw new Error(_error)

                    return fetch(`https://skylabcoders.herokuapp.com/api/v2/users`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({ password })
                    })
                        .then(response => {
                            if (response.content) {
                                const { error } = JSON.parse(response.content)

                                if (error) throw new Error(error)
                            }
                        })
                })
        )
    })

    it('should fail when user does not exist', () =>
        authenticateUser(username, password)
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).toBeInstanceOf(Error)
                expect(error.message).toBe('username and/or password wrong')
            })
    )

    it('should fail on non-string username', () => {
        username = 1
        expect(() =>
            authenticateUser(username, password)
        ).toThrowError(TypeError, `username ${username} is not a string`)

        username = true
        expect(() =>
            authenticateUser(username, password)
        ).toThrowError(TypeError, `username ${username} is not a string`)

        username = undefined
        expect(() =>
            authenticateUser(username, password)
        ).toThrowError(TypeError, `username ${username} is not a string`)
    })

    it('should fail on non-string password', () => {
        password = 1
        expect(() =>
            authenticateUser(username, password)
        ).toThrowError(TypeError, `password ${password} is not a string`)

        password = true
        expect(() =>
            authenticateUser(username, password)
        ).toThrowError(TypeError, `password ${password} is not a string`)

        password = undefined
        expect(() =>
            authenticateUser(username, password)
        ).toThrowError(TypeError, `password ${password} is not a string`)
    })
})