'use strict'

function register(user) {
    var userExist = users.some(function(element) {
        return user.username === element.username
    })

    if(userExist) {
        throw new Error('Username in use')
    } else {
        users.push(user)
    }
}