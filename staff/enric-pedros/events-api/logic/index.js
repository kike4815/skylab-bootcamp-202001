module.exports = {
    registerUser: require('./register-user'),
    authenticateUser: require('./authenticate-user'),
    retrieveUser: require('./retrieve-user'),   
    createEvent: require('./create-events'),
    retrieveUserEvents: require('./retrieve-user-events'),
    retrieveLastUserEvents: require('./retrieve-last-user-events'),
    suscribe: require('./suscribe'),
    suscribedEvent: require('./suscribed-events'),
    updateEvent: require('./update-event'),
    deleteEvent: require('./delete-event')
}