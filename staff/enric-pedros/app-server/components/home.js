const Results = require('./results') 
const User = require('./user')

module.exports = function(props = {}) {
    const { name, username, query='',results} = props
    
    return `<section>
    ${User({name,username})}
 <h2>Search</h2>

<form action="/search/" method="GET"><input type="text" name="query" value=${query}>
<button type="submit">Search</button>
</form>



${results? Results({results}):''}
`




}
