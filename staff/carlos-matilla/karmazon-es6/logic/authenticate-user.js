function authenticateUser(username, password, callback) {
  
    if (typeof username !== 'string') throw new TypeError(`username ${username} is not a string`)
    if (typeof password !== 'string') throw new TypeError(`password ${password} is not a string`)

    call('https://skylabcoders.herokuapp.com/api/v2/users/auth', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password})
    }, response =>{
        
        if(response instanceof Error) return callback(error)
        if(response.status === 200) callback(response)
    }
    )
  
}