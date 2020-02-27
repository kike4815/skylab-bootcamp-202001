function getUserInfo(token, callback) {
    const sub = getSub(token)

    call(`https://skylabcoders.herokuapp.com/api/v2/users/${sub}`, {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }, (error, response) => {
        if(error) {
            return callback(error)
        } else if (response.status === 400) {
            callback(new Error('Wrong user id'))
        } else if(response.status === 401) {
            callback(new Error('Wrong token'))
        } else if(response.status === 200) {
            const userInfo = JSON.parse(response.content)
            
            callback(undefined, userInfo)
        } else {
            callback(new Error('Unknown error'))
        }
    })
}