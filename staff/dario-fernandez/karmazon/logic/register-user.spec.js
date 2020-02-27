describe('registerUser()', () => {
    const user = {name: undefined, surname: undefined, username: undefined, password: undefined}
    
    beforeEach(() => {
        for(key in user) {
            user[key] = `${key}--${Math.random()}`
        }
    })

    it('should register a new user', done => {

        registerUser(user, response => {
            expect(response).toBeUndefined()

            done()
        })
    })

    describe('on already existing user', () => {
        beforeEach(done => {
            call('https://skylabcoders.herokuapp.com/api/v2/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
            }, () => {
            done()
            })
        })

        it('should fail', done => {
            registerUser(user, response => {
                expect(response).toBeInstanceOf(Error)
                
                done()
            })
        })
    })
})