import sayHello from './say-hello'

describe('sayHello', () => {
    it('should succeed on correct name', () => 
        sayHello('Pepito')
            .then(salutation => expect(salutation).toBe('hello Pepito!'))
    )
})