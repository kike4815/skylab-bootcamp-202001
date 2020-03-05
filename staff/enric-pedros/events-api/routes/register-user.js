const {registerUser} = require('../logic')
const { NotAllowedError, ContentError } = require('events-error')

module.exports= (req, res) => {
    const {body: {name, surname, email, password}} = req
    
    try {
        registerUser(name, surname, email, password)
        .then(() => res.status(201).end())
        .catch((error) =>{
            let status = 400

            if (error instanceof NotAllowedError)
                status = 409
            
            const {message} = error

            res
                .status(status)
                .json(message)
        }
        )
    }catch (error){   
        
        if (error instanceof ContentError)
            status = 406
        
        const {message} = error
        
        res
        .status(409)
        .json(message)

    }
}