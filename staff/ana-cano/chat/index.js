const express = require('express');

var app = express();

app.use('/', function(req, res){
    res.send('Hola');
});

app.listen(3000);
console.log('La aplicación está eschucando en http:/localhost:3000')
