const { retrieveUser } = require('.')
const { fetch } = require('../utils')
require('../specs/specs-helper.js')

describe('retrieveUser', () => {
    let name, surname, username, password, token

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

                    return fetch(`https://skylabcoders.herokuapp.com/api/v2/users/auth`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ username, password })
                    })
                })
                .then(response => {
                    const { error: _error, token: _token } = JSON.parse(response.content)

                    if (_error) throw new Error(_error)

                    token = _token
                })
        )

        it('should succeed on correct token', () =>
            retrieveUser(token)
                .then(user => {
                    expect(user).toBeDefined()

                    const VALID_KEYS = ['name', 'surname', 'username']
                    Object.keys(user).forEach(key => VALID_KEYS.includes(key))

                    expect(user.name).toBe(name)
                    expect(user.surname).toBe(surname)
                    expect(user.username).toBe(username)
                    expect(user.password).toBeUndefined()
                })
        )

        it('should fail on invalid token', () =>
            retrieveUser(`${token}-wrong`)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).toBeInstanceOf(Error)
                    expect(error.message).toBe('invalid token')
                })
        )

        afterEach(() =>
            fetch(`https://skylabcoders.herokuapp.com/api/v2/users`, {
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
        )
    })

    it('should fail on non-string token', () => {
        token = 1
        expect(() =>
            retrieveUser(token)
        ).toThrowError(TypeError, `token ${token} is not a string`)

        token = true
        expect(() =>
            retrieveUser(token)
        ).toThrowError(TypeError, `token ${token} is not a string`)

        token = undefined
        expect(() =>
            retrieveUser(token)
        ).toThrowError(TypeError, `token ${token} is not a string`)
    })

    it('should fail on invalid token format', () => {
        token = 'abc'

        expect(() =>
            retrieveUser(token)
        ).toThrowError(Error, 'invalid token')
    })
})