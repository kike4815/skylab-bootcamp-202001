function retrieveUser(token, callback){
    
    const payload = token.split('.')[1];

    const sub = JSON.parse(atob(`${payload}`))

    call(`https://skylabcoders.herokuapp.com/api/v2/users/${sub.sub}`,{
        method: 'GET',
        headers: {'Authorization': `Bearer ${token}`}
    }, response =>{
        callback(response)
    })

}