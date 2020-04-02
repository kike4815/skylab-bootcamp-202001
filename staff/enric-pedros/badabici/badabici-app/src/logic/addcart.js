import context from './context'
const { NotAllowedError } = require('badabici-errors')

require('dotenv').config()

const API_URL = process.env.REACT_APP_API_URL

export default (function (idproduct) {


    return (async () => {
        const response = await fetch(`${API_URL}/shopcard`, {
            method: 'POST',
            headers: { 
                    'Content-Type': 'application/json' ,
                    'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify({ idproduct })

        })

        const { status } = response

        if (status === 201) {

            return 
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