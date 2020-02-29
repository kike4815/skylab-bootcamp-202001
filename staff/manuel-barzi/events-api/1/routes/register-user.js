const { registerUser } = require('../logic')

module.exports = (req, res) => {
    const { body: { name, surname, email, password } } = req

    try {
        registerUser(name, surname, email, password)
            .then(() => res.status(201).end())
            .catch(({ message }) =>
                res
                    .status(409)
                    .json({
                        error: message
                    })
            )
    } catch ({ message }) {
        res
            .status(409) //?
            .json({
                error: message
            })
    }
}