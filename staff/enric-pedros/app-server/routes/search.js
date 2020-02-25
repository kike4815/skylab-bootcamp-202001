const {App, Home, Login,Landing} = require('../components')
const {retrieveUser, searchVehicles} = require('../logic')
const { logger } = require('../utils')

module.exports = (req,res)=>{
    const {session: {acceptCookies, token },query:{query}} = req

    if (token){

        try{
        retrieveUser(token, (error, user) => {
            if (error) {
                const { message } = error
                const { session: { acceptCookies } } = req
                return res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies }))
            }
                const { name } = user
                req.session.query = query
    
                searchVehicles(token, query, (error,results)=>{
                    if(error){
                       res.send(App({ title: 'Home', body: Home({error}), acceptCookies }))
                    }
                    else{
                       res.send(App({ title: 'Home', body: Home({name,results}), acceptCookies }))
            
                    }
            
                })
            
            })
        }catch({error}){
            res.send(App({ title: 'Home', body: Home({error:message}), acceptCookies }))
        }
    }else {
        searchVehicles(undefined, query, (error,vehicles)=>{
            req.session.query = query

            if(error){
               res.send(App({ title: 'Home', body: Home({error}), acceptCookies }))
            }
            else{
               res.send(App({ title: 'Home', body: Landing({query,results:vehicles}), acceptCookies }))
    
            }
    
        })
    } 

}