function updateFavs(favs, token, callback) {
    call('https://skylabcoders.herokuapp.com/api/v2/users', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ favs })
    }, (error, response) => {
        if(error) {
            callback(error)
        } else if(response.status === 204) {
            callback(undefined)
        } else {
            callback(new Error('Unknown error'))
        }
    })
}