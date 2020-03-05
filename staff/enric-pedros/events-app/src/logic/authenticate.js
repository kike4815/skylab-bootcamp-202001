import { validate } from 'events-utils'

export default (email, password) => {
    validate.string(email, 'email')
    validate.string(password, 'password')

    return (async () => {
        
        const response = await fetch('http://localhost:8085/users/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        
        if (response.status === 200) return token

        if (response.status === 409) {
            
            // throw new Error(response.json())
            console.log(response.json())
        } else throw new Error('Unknown error')
    })()
}