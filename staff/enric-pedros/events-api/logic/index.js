module.exports = {
    registerUser: require('./register-user'),
    authenticateUser: require('./authenticate-user'),
    retrieveUser: require('./retrieve-user'),
    createEvent: require('./create-event'),
    retrieveEvent: require('./retrieve-event-published'),
    retrieveLastEvents: require('./retrieve-last-events'),
    subscribeEvent: require('./subscribe-event')
}