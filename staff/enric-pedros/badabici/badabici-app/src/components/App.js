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
import Footer from './Footer'
import Listshopping from './Listshopping'
import Addproduct from './Addproduct'
import { registerUser, saveImage, login, isLoggedIn, retrieveUser,loginAdmin, sails, search, addcart, logout, details,shoppinglist, ordered,createproduct } from '../logic' 
import { Context } from './ContextProvider'
import { Route, withRouter, Redirect } from 'react-router-dom'

export default withRouter(function ({ history }) {
  const [state, setState] = useContext(Context) //use context és per contexte global
  const [user, setUser] = useState() 
  const [_sails,setSails] = useState([])
  const [_search,setSearch] = useState([])
  const [_mustlogged, setMustlogged]= useState(false)
  const [searchsale,setSearchSale] = useState(false) //aquest hook serveix per controlar si la persona ve de ofertes
  const [_detail, Setdetail] = useState([])
  const [_shoppinglist, SetShoppinglist]= useState([])
  
  // useEffect(() => {
  //   if (isLoggedIn())
  //       (async () => {
  //           try {
  //             const user = await retrieveUser() 
  //             setUser(user)
  //             setMustlogged(true)
  //           } catch ({ message }) {
  //             setState({ ...state, error: message })
  //             setTimeout(() => setState({...state, error:undefined}), 3000)            
  //           }
  //       })()
  //   else {
  //   //  history.push('./landing')
  //   }
  // },[])

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
    
      history.push('/searchSails')
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
      
      history.push('/addproduct')
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
      
      const user = await retrieveUser() 
      setUser(user)
      
      setMustlogged(true)
      setSearchSale(true)
      
     } 


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

  async function handleGoToListShopping (){
    try{
          
          if (user){
            const shoppingList = await shoppinglist()
            
            SetShoppinglist(shoppingList)
            
            history.push('./listshopping')
          }
      
    }catch({message}){
      setState({ ...state, error: message })
    }
  }
  async function goToOrdered (){
    try{
          
          if (user){
            const _order = await ordered()
            
            
            history.push('./listshopping')
          }
      
    }catch({message}){
      setState({ ...state, error: message })
    }
  }  

  async function onGoToLogout (){
    
      
        logout()
        setUser(undefined)
        setMustlogged(false)
        
        const _sails = await sails()
        setSails(_sails)
        
        history.push('/searchSails')
        // window.location.reload()
 }
 async function handleToCreated (category,subcategory,title,description,price,image,quantity,discount){
  try{
        
        if (user){
          
           const productId = await createproduct(category,subcategory,title,description,price,quantity,Number(discount))
          debugger
           if (image) {
            await saveImage(productId, image)
          }

  
          debugger
          history.push('./searchSails')
        }
    
  }catch({message}){
    setState({ ...state, error: message })
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

  function handleMountLogin() {
    debugger
    setState({ page: 'login' })
  }

  function handleMountRegister() {
    setState({ page: 'register' })
  }

  function handleMountSearch() {
    debugger
    setState({ page: 'search' })
  }



  const { page, error } = state

  return <div className="app">
    <Page name={page}>
      <Route exact path="/" render={() => /* isLoggedIn() ? <Redirect to="/search" /> :  */<Redirect to="/landing" />} />       {/*esto es para hacer rutas exactas i que no te coja el primer route si se repiten*/}
      <Route exact path="/register" render={() =>  isLoggedIn() ?   <Redirect to="/searchSails" /> :  <Register onSubmit={handleRegister} error={error} onGoToLogin={handleGoToLogin} onMount={handleMountRegister} />} />
      <Route exact path="/login" render={() =>  isLoggedIn() ?  <Redirect to="/searchSails" /> : <Login onSubmit={handleLogin} error={error} onGoToRegister={handleGoToRegister} onMount={handleMountLogin} />} />
      <Route exact path="/search" render={() =><><Header onSubmit={handleToSearch} onGoToLogin={handleGoToLogin} onGoToRegister={handleGoToRegister} onGoToAdmin={handleGoToAdmin}/><Navigation user={user} onGoToLogout={onGoToLogout} onGoToContact = {handleGoToContact} onGoToSearch={handleGoToSearch} onGoToSails ={handleToSails} onGoToUpdate onGoToShopping={handleGoToListShopping}/><Search onMount={handleMountSearch} user={user} _search={_search} onGoToCart={handleToCart} _mustlogged={_mustlogged} onGoToDetail={handleToDetail} _detail={_detail}/></>} />
      <Route exact path="/searchSails" render={() =><><Header onSubmit={handleToSearch} onGoToLogin={handleGoToLogin} onGoToRegister={handleGoToRegister} onGoToAdmin={handleGoToAdmin}/><Navigation user={user} onGoToLogout={onGoToLogout} onGoToContact = {handleGoToContact} onGoToSearch={handleGoToSearch} onGoToSails ={handleToSails} onGoToUpdate onGoToShopping={handleGoToListShopping}/><Search onToSails={handleGoToSails} onMount={handleMountSearch} user={user} _sails={_sails} onGoToCart={handleToCart} _mustlogged={_mustlogged} onGoToDetail={handleToDetail} _detail={_detail} searchsale={searchsale}/></>} />
      <Route path="/loginAdmin" render={() => /* isLoggedIn() ? <Redirect to="/search" /> : */ <LoginAdmin onSubmit={handleLoginAdmin} error={error} onGoToSearch={handleGoToSails} />} />
      <Route path="/landing" render={() => /* /* isLoggedIn() ? <Redirect to="/search" /> : */  <Landing onGoToSails={handleToSails} error={error} onGoToSearch={handleGoToSearch} />} />
      <Route path="/contact" render={() =><><Header onSubmit={handleToSearch} onGoToLogin={handleGoToLogin} onGoToRegister={handleGoToRegister} onGoToAdmin={handleGoToAdmin}/><Navigation user={user} onGoToLogout={onGoToLogout} onGoToContact = {handleGoToContact} onGoToSearch={handleGoToSearch} onGoToSails ={handleToSails} onGoToUpdate onGoToShopping={handleGoToListShopping} onMount={handleGoToSails}/> <Contact onGoToSails={handleToSails} error={error} onGoToSearch={handleGoToSearch} /></>} />
      <Route path="/listshopping" render={() =><><Header onSubmit={handleToSearch} onGoToLogin={handleGoToLogin} onGoToRegister={handleGoToRegister} onGoToAdmin={handleGoToAdmin}/><Navigation user={user} onGoToLogout={onGoToLogout} onGoToContact = {handleGoToContact} onGoToSearch={handleGoToSearch} onGoToSails ={handleToSails} onGoToUpdate onGoToShopping={handleGoToListShopping}/> <Listshopping onGoToBack = {handleGoToSails}  goToOrdered={goToOrdered} onGoToCart={handleToCart}/><Footer/></>} />
      <Route path="/addproduct" render={() =><><Addproduct onGoToBack = {handleGoToSails}  goToCreate={handleToCreated}/></>} />

    </Page>
  </div>
}) 