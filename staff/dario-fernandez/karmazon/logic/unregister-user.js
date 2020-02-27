function unregisterUser(password, token, callback) {
    const requestBody = {
        password: password
    }

    call('https://skylabcoders.herokuapp.com/api/v2/users', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestBody)
    }, (error, response) => {
        if(error){
            return callback(error)
        } else if(response.status === 204) {
            callback()
        } else if(response.status === 401) {
            const { error } = JSON.parse(response.content)

            callback(new Error(error))
        } else {
            callback(new Error('Unknon error'))
        }
    })
}