require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User } } = require('badabici-data')
const { expect } = require('chai')
const { random } = Math
const updateUser = require('./update-user')
const bcrypt = require('bcryptjs')
const { ContentError, NotAllowedError } = require('badabici-errors')



describe('updateUser', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany())
    )

    let name, surname, email, password,_id

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
    })

    describe('when user already exists', () => {
    
        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(password =>
                    User.create({ name, surname, email, password })
                )
                .then(user => _id = user.id)
        )
    })
    
    it('happy path with user exists', () =>{
        User.find(_id)
            .then(user =>{
                expect(user).not.to.be.undefined
                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(name)
                expect(user.email).to.equal(name)
            })
            .then(()=>
                updateUser(_id,{name:`${name}-up`,surname:`${surname}-up`,email:`${email}-up`})
            )
            .then(()=>{
                User.findById(_id).lean()
            })
            .then((newuser)=>{
                expect(newuser).to.exist
                expect(newuser.name).to.equal(name)
                expect(newuser.surname).to.equal(name)
                expect(newuser.email).to.equal(name)
            })
    })

    after(async () => {
        await Promise.resolve(User.deleteMany())
        return await mongoose.disconnect()
    })

})