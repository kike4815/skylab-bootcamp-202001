import React, { useState, useEffect, useContext } from 'react'
import Page from './Page'
import Register from './Register'
import Login from './Login'
import Search from './Search'
import Header from './Header'
import Navigation from './Navigation'
import LoginAdmin from './LoginAdmin'
import Landing from './Landing'
import Contact from './Contact'
import Listshopping from './Listshopping'
import { registerUser, login, isLoggedIn, retrieveUser,loginAdmin, sails, search, addcart, logout, details } from '../logic' 
import { Context } from './ContextProvider'
import { Route, withRouter, Redirect } from 'react-router-dom'

export default withRouter(function ({ history }) {
  const [state, setState] = useContext(Context) //use context és per contexte global
  const [user, setUser] = useState() // aquest hook és per poder-lo utilitzar en tots els components que interesen
  const [_sails,setSails] = useState([])
  const [_search,setSearch] = useState([])
  const [_mustlogged, setMustlogged]= useState(false)
  const [searchsale,setSearchSale] = useState(false) //aquest hook serveix per controlar si la persona ve de ofertes
  const [_detail, Setdetail] = useState([])
  

  // useEffect(() => {
  //   // if (isLoggedIn()) {

  //   //   history.push('/search')
  //   // } else {

  //     history.push('/landing')
    
  // }, [])

  async function handleRegister(name, surname, email, password) {
    try {
      await registerUser(name, surname, email, password)

    history.push('/login')
    } catch ({ message }) {
      
      history.push('/register')
      setState({...state, error:message})
     

      setTimeout(() => {
        setState({...state, error:undefined})
      }, 3000)
    }
  }

  async function handleLogin(email, password) {
    try {
      await login(email, password)
      const user = await retrieveUser() 
      setUser(user)
      setMustlogged(true)
      searchsale ? history.push('/searchSails'): history.push('/search')
    } catch ({ message }) {
      setState({ ...state, error: message })

      setTimeout(() => {
        setState({...state, error:undefined})
      }, 3000)
    }
  }
  async function handleLoginAdmin(email, password) {
    try {
      await loginAdmin(email, password)
      const user = await retrieveUser() 
      setUser(user)
      
      history.push('/search')
    } catch ({ message }) {
      setState({ ...state, error: message })

      setTimeout(() => {
        setState({...state, error:undefined})
      }, 3000)
    }
  }

  async function handleToSails (){
    try{
      
      const _sails = await sails()
      setSails(_sails)
      history.push('/searchSails')

    }catch({message}){
      setState({ ...state, error: message })
    }
  }

  async function handleToDetail (detail){
    try{
      
      const _detail = await details(detail)
      Setdetail(_detail)
     

    }catch({message}){
      setState({ ...state, error: message })
    }
  }

  async function handleToCart (idproduct){
    try{
        
    if (isLoggedIn()) {
      
      await addcart(idproduct)
      debugger
      const user = await retrieveUser() 
      setUser(user)
      debugger
      setMustlogged(true)
      setSearchSale(true)
      debugger
     } 
    //  else {
           
    //   // setTimeout(() => {
    //   //   setMustlogged(false)
    //   //   history.push('/login')
    //   // }, 3000)
    // }

    }catch({message}){
      setState({ ...state, error: message })
    }
  }

  async function handleToSearch (searchinput){
    try{
      
      searchinput = searchinput.toLowerCase()
      
      const _search = await search(searchinput)
      setSearch(_search)
      setSails([])
      
      history.push('/search')

    }catch({message}){
      setState({ ...state, error: message })
    }
  }

  async function onGoToLogout (){
    
      if(user){
        
        logout()
        setUser(undefined) //comprovar esto
        setMustlogged(false)
        history.push('/searchSails')
      }
      

  }


  function handleGoToLogin() {
    history.push('/login')
  }

  function handleGoToRegister() {
    history.push('/register')
  }
  function handleGoToSearch() {
    history.push('/search')
  }
  function handleGoToAdmin() {
    history.push('/loginAdmin')
  }
  function handleGoToContact() {
    history.push('/Contact')
  } 
    function handleGoToSails() {
      history.push('/searchSails')
  }
  function handleGoToListShopping() {
    history.push('/listshopping')
  }

  function handleMountLogin() {
    setState({ page: 'login' })
  }

  function handleMountRegister() {
    setState({ page: 'register' })
  }

  function handleMountSearch() {
    setState({ page: 'search' })
  }
  function handleMountSearchSails() {
    setState({ page: 'searchSails' })
  }

  const { page, error } = state

  return <div className="app">
    <Page name={page}>
      <Route exact path="/" render={() => /* isLoggedIn() ? <Redirect to="/search" /> :  */<Redirect to="/landing" />} />       {/*esto es para hacer rutas exactas i que no te coja el primer route si se repiten*/}
      <Route exact path="/register" render={() =>/*  isLoggedIn() ? *//*  <Redirect to="/search" /> : */ <Register onSubmit={handleRegister} error={error} onGoToLogin={handleGoToLogin} onMount={handleMountRegister} />} />
      <Route exact path="/login" render={() =>/*  isLoggedIn() ? *//*  <Redirect to="/search" /> : */ <Login onSubmit={handleLogin} error={error} onGoToRegister={handleGoToRegister} onMount={handleMountLogin} />} />
      <Route exact path="/search" render={() =><><Header onSubmit={handleToSearch} onGoToLogin={handleGoToLogin} onGoToRegister={handleGoToRegister} onGoToAdmin={handleGoToAdmin}/><Navigation user={user} onGoToLogout={onGoToLogout} onGoToContact = {handleGoToContact} onGoToSearch={handleGoToSearch} onGoToSails ={handleToSails} onGoToUpdate onGoToShopping={handleGoToListShopping}/><Search onMount={handleMountSearch} user={user} _search={_search} onGoToCart={handleToCart} _mustlogged={_mustlogged} onGoToDetail={handleToDetail} _detail={_detail}/></>} />
      <Route exact path="/searchSails" render={() =><><Header onSubmit={handleToSearch} onGoToLogin={handleGoToLogin} onGoToRegister={handleGoToRegister} onGoToAdmin={handleGoToAdmin}/><Navigation user={user} onGoToLogout={onGoToLogout} onGoToContact = {handleGoToContact} onGoToSearch={handleGoToSearch} onGoToSails ={handleToSails} onGoToUpdate onGoToShopping={handleGoToListShopping}/><Search onMount={handleMountSearchSails} user={user} _sails={_sails} onGoToCart={handleToCart} _mustlogged={_mustlogged} onGoToDetail={handleToDetail} _detail={_detail}/></>} />
      <Route path="/loginAdmin" render={() => /* isLoggedIn() ? <Redirect to="/search" /> : */ <LoginAdmin onSubmit={handleLoginAdmin} error={error} onGoToSearch={handleGoToSails} />} />
      <Route path="/landing" render={() => /* isLoggedIn() ? <Redirect to="/search" /> : */ <Landing onGoToSails={handleToSails} error={error} onGoToSearch={handleGoToSearch} />} />
      <Route path="/contact" render={() =><><Header onSubmit={handleToSearch} onGoToLogin={handleGoToLogin} onGoToRegister={handleGoToRegister} onGoToAdmin={handleGoToAdmin}/><Navigation user={user} onGoToLogout={onGoToLogout} onGoToContact = {handleGoToContact} onGoToSearch={handleGoToSearch} onGoToSails ={handleToSails} onGoToUpdate onGoToShopping={handleGoToListShopping}/> <Contact onGoToSails={handleToSails} error={error} onGoToSearch={handleGoToSearch} /></>} />
      <Route path="/listshopping" render={() =><><Header onSubmit={handleToSearch} onGoToLogin={handleGoToLogin} onGoToRegister={handleGoToRegister} onGoToAdmin={handleGoToAdmin}/><Navigation user={user} onGoToLogout={onGoToLogout} onGoToContact = {handleGoToContact} onGoToSearch={handleGoToSearch} onGoToSails ={handleToSails} onGoToUpdate onGoToShopping={handleGoToListShopping}/> <Listshopping onGoToBack = {handleGoToSails} user={user}/></>} />
    </Page>
  </div>
}) 