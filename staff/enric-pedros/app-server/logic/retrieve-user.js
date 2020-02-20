const users = require('../data')

module.exports= function(usernameUser) {
    if (typeof usernameUser !== 'string') throw new TypeError(`usernameUser ${usernameUser} is not a string`)

    const _user =  users.find(user => {
            return user.username === usernameUser
        })
        return {name,surname,username} = _user
    }

