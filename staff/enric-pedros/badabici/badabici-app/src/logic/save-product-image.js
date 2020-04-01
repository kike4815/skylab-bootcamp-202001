import { validate } from 'badabici-utils'
import context from './context'
require('dotenv').config()

const API_URL = process.env.REACT_APP_API_URL

export default (function (productId, image) {
    
    if (productId) {
        validate.string(productId, 'productId')
        if (!productId.trim().length) throw new Error(`productId is empty or blank`)
    }

    let formData = new FormData()
    formData.append('image', image)
debugger
    return (async () => {
        
            const response = await fetch(`${API_URL}/products/${productId}/images`, {
                method: 'POST',
                headers: { 'Authorization': 'Bearer ' + this.token, },
                body: formData
            })
            if (response.status === 201) return   //await response.json()

    })()
}).bind(context)