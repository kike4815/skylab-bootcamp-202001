const { registerUser } = require('../logic')

registerUser('Pepito', 'Grillo', 'pepigri@mail.com', '123')
    .then(() => console.log('registered'))
    .catch(error => console.error(error))