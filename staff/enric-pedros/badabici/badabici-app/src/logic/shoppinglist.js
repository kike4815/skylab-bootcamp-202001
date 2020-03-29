import context from './context'
const { NotAllowedError } = require('badabici-errors')
require('dotenv').config()

const API_URL = process.env.REACT_APP_API_URL

export default (function () {


    return (async () => {
        const response = await fetch(`${API_URL}/user/retrieve/chart`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            }
        })

        const { status } = await response
    
        if (status === 200) {
            const user = await response.json()

            return user
        }

        if (status >= 400 && status < 500) {
            const { error } = await response.json()

            if (status === 401) {
                throw new NotAllowedError(error)
            }

            throw new Error(error)
        }

        throw new Error('server error')
    })()
}).bind(context)