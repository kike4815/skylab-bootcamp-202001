import { validate } from 'badabici-utils'
import context from './context'
const { NotAllowedError } = require('badabici-errors')
require('dotenv').config()

const API_URL = process.env.REACT_APP_API_URL

export default (function (category,subcategory,title,description,quantity,price,discount) {
    validate.string(category, 'category')
    if(subcategory) validate.string(subcategory, 'subcategory')
    validate.string(title, 'title')
    validate.string(description,'description')
    validate.string(quantity,'quantity')
    validate.string(price, 'price')
    validate.type(discount,'discount', Number)

    return (async () => {
        debugger
        const response = await fetch(`${API_URL}/products/admin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}` 
        },
            body: JSON.stringify({ category,subcategory,title,description,quantity,price,discount })
        })

        const { status } = response
debugger
        if (status === 201) {
            const {id} = await response.json()
            return id
        }

        if (status >= 400 && status < 500) {
            const { error } = await response.json()

            if (status === 409) {
                throw new NotAllowedError(error)
            }

            throw new Error(error)
        }

        throw new Error('server error')
    })()
}).bind(context)