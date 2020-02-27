const { Component, Fragment } = React // === const Component = React.Component


class App extends Component{
        state = { view: undefined, vehicles: undefined, vehicle: undefined, error: undefined, userName: undefined }
    
    componentWillMount() {
        const { token } = sessionStorage
        if(token) {
            getUserInfo(token, (error, userInfo) => {
                if(error) {
                    sessionStorage.clear()
                    this.setState({ view: 'login' })
                } else {
                    if(location.search){
                        let query = location.search.split('=')[1]

                        searchVehicles(query, token, (error, vehicles) => {
                            if(error) {
                                this.setState({ error: error.message })

                                setTimeout(() => {
                                    this.setState({ error: undefined })
                                })
                            } else {
                                this.setState({ view: 'search', userName: `${userInfo.name} ${userInfo.surname}`, vehicle: undefined, vehicles })
                            }
                        })
                    }
                }
            })

        } else {
            this.setState({ view: 'login' })
        }
    }
    
    handleLogin = credentials =>  {
        try {
            authenticateUser(credentials, (error, token) => {
                if(error) {
                    this.setState({ error: 'Wrong credentials' })

                    setTimeout(() => {
                        this.setState({ error: undefined })
                    }, 3000)
                } else {
                    sessionStorage.token = token
                    getUserInfo(token, (error, userInfo) => {
                        if(error) {
                            this.setState({ error: 'Token error' })
                        } else {
                            this.setState({ userName: `${userInfo.name} ${userInfo.surname}` })
                            this.setState({ view: 'search' })
                        }
                    })
                    
                }     
                
            })
        } catch(error) {
            this.setState({ error: error.message })

            setTimeout(() => {
                this.setState({ error: undefined })
            }, 3000)
        }
    }

    handleOnToRegister = () => {
        this.setState({ view: 'register' })
    }
    
    handleRegister = ({ name, surname, username, password }) => {
        try{
            registerUser({ name, surname, username, password, favs: [] }, error => {
                if(error) {
                    this.setState({ error: undefined })
                    this.setState({ error: `${username} is in use` })

                    setTimeout(() => {
                    }, 3000)
                } else {
                    this.setState({ view: 'login' })
                }
            })

        } catch (error) {
            this.setState({ error: error.message })

            setTimeout(() => {
                this.setState({ error: undefined })
            }, 3000);
        }
    }

    handleOnToLogin = () => {
        this.setState({ view: 'login' })
    }

    handleSearch = query => {
        let { token } = sessionStorage
        searchVehicles(query, token, (error, vehicles) => {
            if(error) {
                this.setState({ error: error.message })

                setTimeout(() => {
                    this.setState({ error: undefined })
                }, 3000)
            
            }

            const { protocol, host, pathname } = location

            const url = `${protocol}//${host}${pathname}?q=${query}`

            history.pushState({ path: url }, '', url)

            this.setState({ vehicles, vehicle: undefined})
            
        })}

    handleOnToDetails = id => {
        searchDetails(id, (error, vehicle) => {
            if(error) {
                this.setState({ error: error.message })

                setTimeout(() => {
                    this.setState({  })
                })
            } else {
                this.setState({ vehicles: undefined })
                this.setState({ vehicle })
                this.setState({ view: 'details' })
            }
        })
    }

    handleCloseDetails = () => {
        this.setState({ vehicle: undefined })
        this.setState({ view: 'search' })
    }

    handleOnFavClick = id => {
        let { token } = sessionStorage
        toggleFav(id, token, error => {
            if(error){
                this.setState({ error: error.message })

                setTimeout(() => {
                    this.setState({ error: undefined })
                })
            } else {
                let query = location.search.split('=')[1]
                
                this.handleSearch(query)
            }
        })
    }
    
    render(){
        const {props: { title }, state: { view, vehicles, vehicle, error, userName }, handleLogin, handleOnToRegister, handleRegister, handleOnToLogin, handleSearch, handleOnToDetails, handleCloseDetails, handleOnFavClick} = this

        return <main className="app">
            <h1 className="app__title">{title}</h1>
            {view === 'login' && <Login onSubmit={handleLogin} onToRegister={handleOnToRegister} error={error}  />}
            {view === 'register' && <Register onSubmit={handleRegister} onToLogin={handleOnToLogin} error={error} />}
            {view === 'search' && <Search onSubmit={handleSearch} warning={error} user={userName}/>} 
            {view === 'search' && vehicles && <Results results={vehicles} onClick={handleOnToDetails} onFavClick={handleOnFavClick} />}
            {view === 'details' && <Details details={vehicle} onCloseDetails={handleCloseDetails}/>}
        </main>
    }
}