const { expect } = require('chai')
const validate = require('./validate')

describe('validate', () => {
    describe('string', () => {
        it('should not throw on string target', () => {
            const name = 'something'
            let target = 'a string'

            expect(() => validate.string(target, name)).not.to.throw()
        })

        it('should throw type-error on non-string target', () => {
            const name = 'something'

            let target = 1
            expect(() => validate.string(target, name)).to.throw(TypeError, `${name} ${target} is not a string`)

            target = true
            expect(() => validate.string(target, name)).to.throw(TypeError, `${name} ${target} is not a string`)

            target = {}
            expect(() => validate.string(target, name)).to.throw(TypeError, `${name} ${target} is not a string`)

            target = []
            expect(() => validate.string(target, name)).to.throw(TypeError, `${name} ${target} is not a string`)
        })

        it('should throw type-error on empty string target with default empty flat to true', () => {
            const name = 'something'

            let target = ''
            expect(() => validate.string(target, name)).to.throw(Error, `${name} is empty`)
        })

        it('should not throw on empty string target with empty flat to false', () => {
            const name = 'something'

            let target = ''
            expect(() => validate.string(target, name, false)).not.to.throw()
        })
    })

    // TODO email validation unit tests
})