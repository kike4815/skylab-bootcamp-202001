import { ContentError } from 'badabici-errors'

require('dotenv').config()

const API_URL = process.env.REACT_APP_API_URL
// const {env: {REACT_APP_API_URL: API_URL}} = process

export default function (query) {
    //const {category, title, subcategory, description, price} = query
    return (async () => {
        debugger
        const response = await fetch(`${API_URL}/search?${query}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })

        const { status } = response

        if (status === 201) {
            const search = await response.json() //response.json = recibe datos json i los transforma  //JSON.parse(response.content) los converite a JSON i los envia
            search.forEach(element => {
                element.image = `${API_URL}/product/${element._id}/image`
            })



            return search
        }

        if (status >= 400 && status < 500) {
            const { error } = await response.json()

            if (status === 401) {
                throw new ContentError(error) 
            }

            throw new Error(error)
        }

        throw new Error('server error')
    })();
}