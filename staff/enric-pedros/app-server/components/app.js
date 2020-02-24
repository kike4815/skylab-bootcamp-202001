const Cookies = require('./cookies')

module.exports = function (props = {}) {
    const { title, body, acceptCookies } = props

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="icon" href="/favicon.ico" type="image/x-icon" />
    <link rel="stylesheet" href="/style.css">
</head>
<body class="app">
    ${body}
    ${!acceptCookies ? Cookies() : ''}
</body>
</html>`
}