const { validate } = require('events-utils')
const { models: { Event, User } } = require('events-data')


module.exports = (publisher, title, description, location, date) => {
    validate.string(publisher, 'publisher')
    validate.string(title, 'title')
    validate.string(description, 'description')
    validate.string(location, 'location')
    validate.type(date, 'date', Date)

    return Event.findOne({title})
    .then(event => {
        if(event) throw new Error('The event is already created')

        event = new Event({ publisher: ObjectId(publisher), title, description, location, date })

        return event.save()
    })
    .then(({_id}) =>{
        return User.updateOne({_id: ObjectId(publisher)}, {$push:{createdEvents: _id }})
    })
    .then(()=>{})

}
