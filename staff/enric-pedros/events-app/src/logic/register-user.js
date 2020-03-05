import { validate } from 'events-utils'

export default (name, surname, email, password) => {


    return (async () => {
        const response = await fetch('http://localhost:8085/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, surname, email, password })
        })
        if (response.status === 201) return
        if (response.status === 409) {
            const _response = await response.json()
            const error = _response

            throw new Error(error)
        } else throw new Error('Unknown error')
    })()
}