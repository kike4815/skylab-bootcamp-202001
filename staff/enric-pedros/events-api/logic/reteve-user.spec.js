require('dotenv').config()

const {expect} = require('chai')
const {env: {TEST_MONGODB_URL}} = process
const {database} = require('../data')
const {retrieveUser} = require('../logic')

// describe('retrieve user', () =>{

//     des
// })