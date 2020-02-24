module.exports = function (props = {}) {
    const { name = 'Anonymous', username } = props

    return `<section>
<h1>Welcome, ${name}!</h1>${username ? `<form action="/logout" method="POST"><input type="hidden" value="${username}" name="username"><button>Logout</button></form>` : ''}
</section>`
}