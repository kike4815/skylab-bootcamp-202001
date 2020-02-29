require('dotenv').config()

const { authenticateUser } = require('../logic')

authenticateUser('pepigri@mail.com', '123')
    .then(token => console.log(token))
    .catch(error => console.error(error))