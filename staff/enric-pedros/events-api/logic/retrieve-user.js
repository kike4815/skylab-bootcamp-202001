const { validate } = require('../utils')
const {models: {User}} =require('../data')
const {NotAllowedError, NotFoundError} = require('../errors')
module.exports = (sub) => {
    validate.string(sub, 'sub')

    //const _id = ObjectId(sub)

    return User.findById(sub)
        .then(user =>{
            if (!user) throw new NotFoundError(`user with id ${sub} does not exist`)

            if (user.deactivated) throw new NotAllowedError(`user with id ${sub} is deactivated`)

            user.retrieved = new Date

            return user.save()            
            // return users.updateOne({_id}, {$set:  {retrieved: new Date}})
            //     .then(() =>{
            //         const {name, surname, email} = user

            //         return {name, surname, email}
                    
            //     })
        })
}