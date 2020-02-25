
const {retrieveUser} = require('../logic')

module.exports = ({ session: { acceptCookies, token } }, res) => {
    
    try{
        if (token){
            retrieveUser(token,error=>{
                res.render('/search',{acceptCookies})
                // res.send(App({ title: 'My App', body: Search(), acceptCookies }))
            })    
        }else{
                res.render('landing',{acceptCookies})
            // res.send(App({ title: 'My App', body: Landing(), acceptCookies }))
        }
    }catch(error){
               res.render('landing',{acceptCookies})

        // res.send(App({ title: 'My App', body: Landing(), acceptCookies }))

    }
}