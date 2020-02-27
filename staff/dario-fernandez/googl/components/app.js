'use strict'

function App(props) {
    var _app =  document.createElement('main')
    _app.classList.add('app')

    Component.call(this, _app)
    
    _app.innerHTML = '<h1>' + props.title + '</h1>'

    var _login = new Login({
        onSubmit: function(username, password) {
            try {
                authenticate(username, password)
    
                _login.container.replaceWith(_googl.container)
            } catch(error) {
                _login.showError(error.message)
            }
        },
        
        onToRegister: function() {
            _login.container.replaceWith(_register.container)
        }
    })

    _app.append(_login.container)

    var _register = new Register({
        onSubmit: function(user) {
            try {
                register(user)
    
                _register.container.replaceWith(_login.container)
            } catch (error) {
                _register.showError(error)
            }
        },  
        
        onToLogin: function() {
            _register.container.replaceWith(_login.container)
        }
    })

    var _googl = new Search({
        onSubmit: function(query) {
            googl(query, function(results) {
                if(results instanceof Error) {
                    alert('Network error')
                } else{
                    var _results = new Results({ results: results })
                    if (!_googlResults){
                        _googlResults = _results.container
                        _app.append(_googlResults);
                     } else {
                    _googlResults.replaceWith(_results.container);

                    _googlResults = _results.container;
                    }
                }
            })
        }
    })
    var _googlResults
}

App.prototype = Object.create(Component.prototype)
App.prototype.constructor = App