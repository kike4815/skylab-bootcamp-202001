function updateUser(user, token, callback) {

    call('https://skylabcoders.herokuapp.com/api/v2/users', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(user)

    }, response=>{
        if (response instanceof Error) return callback(response)
        
        debugger
        if(response.status === 204) return callback('update successful!')
    })
    

    }