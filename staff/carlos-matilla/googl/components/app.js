'use strict';

var IT = '🎈🤡';

function App(props) {
    var app = document.createElement('main');

    Component.call(this, app);//*

   
    var _login = new Login({
        onSubmit: function (username, password) {
            try {
                authenticate(username, password);

                _login.container.replaceWith(_googl.container);
            } catch (error) {
                //alert(error.message + ' ' + IT);
                _login.showError(error.message + ' ' + IT);
            }
        },
        onToRegister: function () {
            _login.container.replaceWith(_register.container);
        }
    });

    app.append(_login.container);

    var _register = new Register({
        onSubmit: function (name, surname, username, password) {
            try {
                register(name, surname, username, password);

                _register.container.replaceWith(_login.container);
            } catch (error) {
                //alert(error.message + ' ' + IT);
                _register.showError(error.message + ' ' + IT);
            }
        },
        onToLogin: function () {
            _register.container.replaceWith(_login.container);
        }
    });

    var _googl = new Search({
        title: 'Googl',

        onSubmit: function (query) {
            googl(query, function (results) {
                if (results instanceof Error)
                    //return alert(results.message + ' ' + IT);
                    return _googl.showError(results.message + ' ' + IT);

                if (!results.length)
                    return _googl.showWarning('No results ' + IT);

                var _results = Results({ results: results });

                if (!_googlResults)
                    app.append(_googlResults = _results);
                else {
                    _googlResults.replaceWith(_results);

                    _googlResults = _results;
                }
            });
        }
    });

    var _googlResults;
}

App.prototype = Object.create(Component.prototype);
App.prototype.constructor = App;