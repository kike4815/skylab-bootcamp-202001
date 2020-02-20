module.exports= function(props={}){

    const {message} = props
    return (`<form class="login" method="POST" action="/login">
    <h2>Sign-in</h2>
    
    <input type="text" name="username" placeholder="username">
    <input type="password" name="password" placeholder="password">
    
    ${message ? `<p>${message}</p>` : ``}
    
    <button>Login</button>
    
    <a href="/register">Register</a>
    </form>`)
}
