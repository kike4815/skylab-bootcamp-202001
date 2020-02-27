describe('authenticateUser()', () => {
    const user = {name: undefined, surname: undefined, username: undefined, password: undefined}
    
    beforeEach(done => {
        for(key in user) {
            user[key] = `${key}--${Math.random()}`
        }
        
        call('https://skylabcoders.herokuapp.com/api/v2/users/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        }, () => {
            done()
        })
    })

    it('should succeed on authenticate registered user with right credentials', done => {
        authenticateUser({ username: user.username, password: user.password }, token =>{
            expect(typeof token).toBe('string')
            const [header, payload, signature] = token.split('.')
            expect(header.length).toBeGreaterThan(0)
            expect(payload.length).toBeGreaterThan(0)
            expect(signature.length).toBeGreaterThan(0)

            done()
        })
    })

    it('shoud fail on wrong username', done => {
        authenticateUser({ username: `${user.username}--wrong`, password: user.password }, error => {
            expect(error).toBeInstanceOf(Error)

            done()
        })
    })
})