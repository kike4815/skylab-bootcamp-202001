import axios from 'axios'

export default(name, surname, email, password) => {
    if (typeof name !== 'string') throw new TypeError(`name ${name} is not a string`)
    if (!name.trim()) throw new Error('name is empty')
    if (typeof surname !== 'string') throw new TypeError(`surname ${surname} is not a string`)
    if (!surname.trim()) throw new Error('surname is empty')
    if (typeof email !== 'string') throw new TypeError(`email ${email} is not a string`)
    if (!email.trim()) throw new Error('username is empty')
    if (typeof password !== 'string') throw new TypeError(`password ${password} is not a string`)
    if (!password.trim()) throw new Error('password is empty')

   return axios.post('http://localhost:8085/users', {name,surname, email, password})     
   .then(() => {console.log('user registered')}) 
}