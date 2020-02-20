module.exports = function(props = {}){
    const {message} = props
    return `<form class="register" method="POST" action="/register">
            <h2>Sign-up</h2>
        
            <input type="text" name="name" placeholder="name">
            <input type="text" name="surname" placeholder="surname">
            <input type="text" name="username" placeholder="username">
            <input type="password" name="password" placeholder="password">
        
            ${message ? `<p>${message}</p>` : ``}
            <button type="submit">Register</button>
        
            <a href="/login">Login</a>
        </form>
`
}