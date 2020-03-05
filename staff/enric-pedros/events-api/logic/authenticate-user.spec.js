require('dotenv').config()

const { expect } = require('chai')
const { env: { TEST_MONGODB_URL } } = process
const { database, models: { User } } = require('events-data')
const { authenticateUser } = require('../logic')
const {NotAllowedError} = require ('../errors')

describe('Autenticate user', () => {
    
    before(() => 
        database.connect(TEST_MONGODB_URL)
        .then(() => users = database.collection('users'))
    )

    let name, surname, email, password, users
    
    beforeEach(() => {
        name = 'salas-' + Math.random()
        surname = 'salas-' + Math.random()
        email = 'salas@' + Math.random() + '.com'
        password = 'salas-' + Math.random()
    })

    describe('when user already exist', () => {
        let _id
        
        beforeEach(() =>
            users.insertOne(new User({ name, surname, email, password }))
                .then(({ insertedId }) => _id = insertedId)
        )
        it('should return the token', () => {
            authenticateUser(email, password)
                .then((id) => {
                    expect(id).to.be.a('string')
                    expect(id.length).to.be.greaterThan(0)
                    expect(id).to.equal(_id.toString())
                })
        })
        
    })
    it('should fail on a no registered user', () =>{
        authenticateUser(email, password)
        .then(() =>{
            return new Error('you shall not pass')
        })
        .catch((error) => {
            expect(error).to.be.instanceOf(NotAllowedError)
            expect(error.message).to.equal('wrong credentials')

        })
    })
    after(() => database.disconnect())
})