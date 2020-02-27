fdescribe('unregisterUser()', () => {
    const user = {name: undefined, surname: undefined, username: undefined, password: undefined}
    let userToken
    
    beforeEach(done => {
        for(key in user) {
            user[key] = `${key}--${Math.random()}`
        }
        
        call('https://skylabcoders.herokuapp.com/api/v2/users/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
            }, (error, response) => {
                if(error) {
                    return done(error)
                } else if(response.content) {
                    return done(error)
                } else {
                    call('https://skylabcoders.herokuapp.com/api/v2/users/auth', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ username: user.username, password: user.password })
                    }, (error, response) => {
                        if(error) {
                            return done(error)
                        } else {
                            const { token } = JSON.parse(response.content)
            
                            userToken = token
            
                            done()  
                        }
                    })
                }


        })

    })

    it('should delete an existing user', done => {
        expect(userToken).toBeDefined()


    })
})