const jwt = require('jsonwebtoken')
const atob = require('atob')

module.exports = (req, res, next) => {
    const {headers: {authorization}} = req
    try{
        if (!authorization) throw new Error('Invalid token')
        const [, token] = authorization.split(' ')
        const [, payload] = token.split('.')
        const sub = JSON.parse(atob(payload))
        req.sub = sub.sub

        next()
    }catch({message}){
        res
        .status(409)
        .json({
            error: message
        })
    }   
}