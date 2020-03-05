const { random } = Math
const { mongoose, models: { User } } = require('events-data')
const { authenticate } = require('.')
const { env: { REACT_APP_TEST_MONGODB_URL } } = process

// const URLTEST = process.REACT_APP_TEST_MONGODB_URL
// bd test



describe('authenticate', () => {
    //beforeAll   conectar mongoose
    beforeAll(async () => {
        await mongoose.connect(REACT_APP_TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        
        return await Promise.resolve((User.deleteMany()))
        
    })
    
    let name, surname, email, password
    //before each it

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`

    })

    //crear user
    const { id } = User.create({ name, surname, email, password })

    it.only('should return token when succesful with correct credentials',async () => {
        
        const token = await authenticate(email, password)
        expect(token).toBeDefined()
        expect(typeof token).toBe('object')
        const { tokenInfo } = token 
        const [, payload] = tokenInfo.split('.')
        const { sub } = payload

        expect(sub).toEqual(id)
    })

    it('should fail with wrong credentials',async () => {

        const token = await authenticate(email, password)
        expect(token).toBeUndefined()
        //errors
    })
    it('should fail with wrong data', () => {
        //TODO
    })

    beforeAll(async () => {
        await (() => (User.deleteMany()))
        return await mongoose.disconnect()
    })
})