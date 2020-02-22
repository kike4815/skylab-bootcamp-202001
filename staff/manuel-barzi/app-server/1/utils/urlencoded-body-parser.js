module.exports = (req, res, next) => {
    let body = ''

    req.on('data', chunk => {
        body += chunk
    })

    req.on('end', () => {
        body = body.split('&').reduce((accum, keyValue) => {
            const [key, value] = decodeURI(keyValue).split('=')
            
            accum[key] = value
            
            return accum
        }, {})
        
        //console.log('body =>', body)

        req.body = body
        
        next()
    })
}