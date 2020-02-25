const {Details,App} = require('../components')
const {retrieveVehicle} = require('../logic')

module.exports = ({session: {acceptCookies, token}, params:{id}}, res) => {

    retrieveVehicle(token,id,(error,result)=>{
        if(error)
            res.redirect(req.get('referer'))
        if (result)
            res.send(App({ title: `${result.name}`, body: Details({result}), acceptCookies }))
    })
}