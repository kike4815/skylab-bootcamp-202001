'use strict'

function authenticate(username, password) {
    var access
    
    access = users.some(function(element) {
        return element.username === username && element.password === password
    })

    if(!access) {
        throw new Error('Wrong credentials')
    }
}