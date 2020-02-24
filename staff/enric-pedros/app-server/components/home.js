const Results = require('./results') 

module.exports = function(props = {}) {
    const { name, username, query='',results} = props

    return `<section>
<h1>Welcome, ${name}!</h1>



 <h2>Search</h2>

<form action="/search/" method="GET"><input type="text" name="query" value=${query}>
<button type="submit">Search</button>
</form>



<form action="/logout" method="POST"><input type="hidden" value="${username}" name="username"><button>Logout</button></form>
</section>

${results? Results({results}):''}

`



}
