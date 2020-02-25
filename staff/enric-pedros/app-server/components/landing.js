const Home = require('./home')
const Results = require('./results')
const User = require('./user')

module.exports = function(props = {}) {
    const {name, username,query, results} = props
    
    return `${name? User({name,username}):`<a href="/register">Register</a> or <a href="/login">Login</a>`}
    ${Home({query})}
    ${results ? Results({results}):''}`
}