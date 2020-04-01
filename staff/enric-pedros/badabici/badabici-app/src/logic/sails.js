import { ContentError } from 'badabici-errors'


const API_URL = process.env.REACT_APP_API_URL

export default function () {
    
    return (async () => {
        const response = await fetch(`${API_URL}/discounts`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })

        const { status } = response
debugger
        if (status === 201) { 
            const sails = await response.json() //response.json = recibe datos json i los transforma  //JSON.parse(response.content) los converite a JSON i los envia
            sails.forEach(element => {
                element.image = `${API_URL}/product/${element._id}/image`
            })
            
            return sails
        }

        if (status >= 400 && status < 500) {
            const { error } = await response.json()

            if (status === 401) {
                throw new ContentError(error) //posible error aqui
            }

            throw new Error(error)
        }

        throw new Error('server error')
    })()
}