const { sessions } = require('../data')
const uuid = require('uuid/v4')

module.exports = (req, res, next) => {
    let { cookies: { sid } } = req

    // if (sid) {
    //     const session = sessions[sid]

    //     if (!session) {
    //         sessions[sid] = {}
    //     }
    // } else {
    //     sid = uuid()

    //     sessions[sid] = {}
    // }

    // sid && !sessions[sid] && (sessions[sid] = {}) || !sid && (sid = uuid()) && (sessions[sid] = {})

    // (sid && !sessions[sid] || !sid && (sid = uuid())) && (sessions[sid] = {})

    let session

    (sid && !sessions[sid] || !sid && (sid = uuid()) && (res.cookie('sid', sid))) && (session = sessions[sid] = {}) && (req.session = session) || (req.session = sessions[sid])

    debugger

    next()
}