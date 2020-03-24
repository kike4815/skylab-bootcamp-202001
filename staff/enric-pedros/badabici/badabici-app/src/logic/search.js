import { NotAllowedError,ContentError } from 'badabici-errors'



const API_URL = process.env.REACT_APP_API_URL

export default function (searchinput) {
    
    return (async () => {
        const response = await fetch(`${API_URL}/search/${searchinput}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })

        const { status } = response

        if (status === 201) {
            const search = await response.json() //response.json = recibe datos json i los transforma  //JSON.parse(response.content) los converite a JSON i los envia

            return search
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