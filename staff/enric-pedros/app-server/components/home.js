module.exports = function({name}) {
    return `
    <h1>Welcome Back, ${name}</h1>
    <form method:'GET' action='/logout'><button>LogOut</button></form>
    `
}