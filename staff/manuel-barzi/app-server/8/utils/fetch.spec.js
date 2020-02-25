const fetch = require('./fetch')
require('./array.prototype.random')

describe('fetch', () => {
    it('should succeed on valid url', () => {
        const targets = [
            { url: 'https://www.lavanguardia.com/', text: 'vanguardia' },
            { url: 'https://www.eldiario.es/', text: 'eldiario' },
            { url: 'https://www.elmundo.es/', text: 'mundo' },
            { url: 'https://www.expansion.com/', text: 'expansion' },
            { url: 'https://www.abc.es/', text: 'abc' }
        ]

        const target = targets.random()

        return fetch(`https://skylabcoders.herokuapp.com/proxy?url=${target.url}`)
            .then(response => {
                expect(response.status).toBe(200)
                //expect(response.content.toLowerCase().includes(target.text)).toBeTruthy()
                expect(response.content.toLowerCase()).toContain(target.text)
            })
    })

    it('should fail on invalid url', () => {
        const url = 'invalid-url'

        expect(() =>
            fetch(url, undefined, () => { })
        ).toThrowError(SyntaxError, url + ' is not an url')
    })

    it('should fail on valid non-existing url', () => {
        const url = 'https://non-existing.url'

        return fetch(url)
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).toBeInstanceOf(Error)
                expect(error.message).toBe('network error')
            })
    })
})