function registerUser(user, callback) {
    
    call('https://skylabcoders.herokuapp.com/api/v2/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    }, (error, response) => {
        if(error) return callback(error)

        if(response.status === 201) {
            callback(undefined)
        } else if (response.status === 409) {
            const { error } = JSON.parse(response.content)

            callback(new Error(error))
        } else {
            callback(new Error('Unknown error'))
        }
    } )
}