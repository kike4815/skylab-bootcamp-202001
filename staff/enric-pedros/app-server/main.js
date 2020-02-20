const express = require('express')
const register = require('./logic/register')
const users = require('./data')
const path = require('path')
const authenticate = require('./logic/authenticate')
const app = express()
const retrieveUser = require('./logic/retrieve-user')
const bodyParse = require('body-parser')
const {App, Login, Landing, Register, Home} = require('./components')

app.use(express.static('logic'));
app.use(express.static('utils'));
app.use(bodyParse.urlencoded({ extended: false }))

app.get('/',(req,res)=>{
    res.send(App({ title: 'My App', body:Landing()}))
})

app.get('/login',(req,res)=>{
    res.send(App({ title: 'Login', body:Login()}))
})

app.get('/register',(req,res)=>{
    res.send(App({ title: 'Register', body:Register()}))
})



app.post('/register', (req, res) => {

  
        const {name,surname,username,password}= req.body
        try{
            register(name, surname, username, password)
            res.send(App({ title: 'Login', body:Login()}))
        }catch({message}){
            res.send(App({ title: 'Register', body: Register({message})}))
        }
    })

app.post('/login',(req,res)=> {

        const {username, password} = req.body
        try{
            authenticate(username,password)
            const user = retrieveUser(username)
            const {name} = user
            res.send(App({title: 'Home', body: Home({name}) }))
        }catch({message}){
            res.send(App({title:'Login', body: Login({message})}))
        }

    })



app.listen(8080, function () {
    console.log('server up')
})