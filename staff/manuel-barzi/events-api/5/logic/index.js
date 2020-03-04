module.exports = {
    registerUser: require('./register-user'),
    authenticateUser: require('./authenticate-user'),
    retrieveUser: require('./retrieve-user'),
    publishEvent: require('./publish-event'),
    retrieveLastEvents: require('./retrieve-last-events'),
    retrievePublishedEvents: require('./retrieve-published-events'),
    subscribeEvent: require('./subscribe-event')
}