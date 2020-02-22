const IT = '🎈🤡'

const { Component }= React

class App extends Component {

    state={view: undefined, vehicles: undefined, vehicle: undefined, error: undefined, token: undefined}


    componentWillMount(){
        const token = sessionStorage.token
        if(token){
            retrieveUser(token,response=>{
                this.setState({name: JSON.parse(response.content).name})
                this.setState({view: 'search'})
            })
        } else{
            this.setState({view: 'login'})
        }
    }


    handleLogin = (username, password) =>{
        try {
            authenticateUser(username, password, response=>{
                const stringToken = JSON.parse(response.content).token
                sessionStorage.setItem('token', stringToken)
                this.setState({token: stringToken})
                this.setState({view: 'search'})

                retrieveUser(this.state.token, response=>{
                    this.setState({name: JSON.parse(response.content).name})
                })
            })
            
        
        } catch (error) {
            debugger
           this.setState({error: error.message + ' ' + IT})
           setTimeout(() => this.setState({error: undefined}), 2000);
        }
    }

    handleOnToRegister = ()=> {
        this.setState({view: 'register'})
     
    }

    handleRegister = (name, surname, username, password) =>{
        try {
            registerUser (name, surname, username, password)
            
            this.setState({view: 'login'})
        
        } catch (error) {
           
           this.setState({error: error.message + ' ' + IT})
           setTimeout(() => this.setState({error: undefined}), 2000);
        }
    }

    handleOnToLogin = ()=>{
        this.setState({view: 'login'})
    }

    handleSearch = (query)=> {
        searchVehicles(query, vehicles => {
            this.setState({vehicles, vehicle: undefined})
        })
    }

    handleDetails = (id)=>{
               
        retrieveVehicle(id, vehicle => {
             this.setState({vehicle})
         
         })
     }

     handleUpdate = (name, surname, username) => {
         updateUser({name, surname, username}, this.state.token ,msg => {
             console.log(msg)
         })
        }

    render(){
        
        return <main>
            <h1>{this.props.title}</h1>
            <h3>{this.state.name}</h3>

            {this.state.view === 'login' && <Login onSubmit={this.handleLogin} onToRegister={this.handleOnToRegister} error={this.state.error}/>}

            {this.state.view === 'register' && <Register onSubmit={this.handleRegister} onToLogin={this.handleOnToLogin} error={this.state.error}/>}

            {this.state.view === 'search' && <Search title="Search" onSubmit={this.handleSearch}/>}

            {this.state.view === 'search' && <UpdateUser onSubmit={this.handleUpdate}/>}

            {this.state.vehicles &&  !this.state.vehicle && <Results results={this.state.vehicles} onItemClick={this.handleDetails}/>}

            {this.state.vehicle && <Detail vehicle={this.state.vehicle}/>}

        </main>
    }
}