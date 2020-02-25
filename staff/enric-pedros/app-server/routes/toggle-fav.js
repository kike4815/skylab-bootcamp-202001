const {Home} = require('../components')
const {togglefavs} = require('../logic')


module.exports=(req,res)=>{
    const {session ,params:{id}} = req
 
    const { token } = session


    if (!token) {
        session.referer = req.get('referer')

        session.fav = id

        return session.save(() => res.redirect('/login'))
    }

    togglefavs(token,id,(error)=>{
        if(error){
            res.send(App({ title: 'Home', body: Home({error}), acceptCookies }))
         }
         const { referer = req.get('referer') } = session

         delete session.referer
         delete session.fav

         session.save(() => res.redirect(referer))
    })
    
}