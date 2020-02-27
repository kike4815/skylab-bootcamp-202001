function searchDetails(id, callback) {
    call('https://skylabcoders.herokuapp.com/api/hotwheels/vehicles/' + id, undefined, function(error, response) {
        var data = JSON.parse(response.content)
    
        if(error) {
            return callback(error)
        } else if(response.status === 200) {
            callback(undefined, data)   
        } else {
            callback(new Error('Unknown error'))
        }  
    })
}