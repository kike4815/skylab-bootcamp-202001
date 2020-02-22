'use strict';

function register(name, surname, username, password) {
    if (typeof name !== 'string') throw new TypeError('name ' + name + ' is not a string');
    if (!name.trim()) throw new Error('name is empty');
    if (typeof surname !== 'string') throw new TypeError('surname ' + surname + ' is not a string');
    if (!surname.trim()) throw new Error('surname is empty');
    if (typeof username !== 'string') throw new TypeError('username ' + username + ' is not a string');
    if (!username.trim()) throw new Error('username is empty');
    if (typeof password !== 'string') throw new TypeError('password ' + password + ' is not a string');
    if (!password.trim()) throw new Error('password is empty');

    var user = users.find(function (user) { return user.username === username; });

    if (user) throw new Error('User ' + username + ' already exists');

    user = { name: name, surname: surname, username: username, password: password };

    users.push(user);
}