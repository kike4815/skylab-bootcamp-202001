const { expect } = require('chai')
// const validate = require('../utils/validate')
const { users } = require('events-data')
const { authenticateUser, registerUser } = require('../logic')
describe('register', () => {
    let name, surname, email, password
    beforeEach(() => {
        name = 'rpc-' + Math.random()
        surname = 'rpc-' + Math.random()
        email = 'rpc@' + Math.random() + '.com'
        password = 'rpc-' + Math.random()
    })
    it('should succeed on new user', () => {
        registerUser(name, surname, email, password)
            .then(response => {
                expect(response).to.equal(undefined)
            })
    })
    it('it should create the user wel', () => {
        registerUser(name, surname, email, password)
            .then(()=>{
                const user = users.find(user => user.email === email)
                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(email)
                expect(user.password).to.equal(password)
            })
    })

})