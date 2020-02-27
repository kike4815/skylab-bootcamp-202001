function getSub(token) {
    const [ , payload, ] = token.split('.')

    const { sub } = JSON.parse(atob(payload))

    return sub
}