//Módulos
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const fx = require('./Controller/Functions');
const mw = require('./Controller/MiddleWares');

//Servidor express
const server = express();

//Variables
const vari = require('./Variables/Variables');

//Parsea el body
server.use(bodyParser.json());

//Capturar errores generales
server.use((fail, req, res, next)=>{
    if(!fail){
        next();
    }else{
        res.status(500).send({Error: 'Somthing bad happen!!'});
    };
});

//Rutas
server.get('/usuarios', fx.usuarios);
// Ruta de registro de usuario
server.post('/signup', mw.validateExistence, fx.signUpUser);
// Ruta de login de usuario
server.post('/login', mw.validateLogin, fx.logInToken);
// Ruta de verificación de usuario (aún no se decide si está o no, solo es prueba)
server.get('/login', mw.verifyLogInToken, (req, res)=>{
    res.send(`Esta es una página autenticada. Hola ${req.username.username}`);
})
// Ruta de menú
server.get('/menu', mw.verifyLogInToken, fx.menu);

// Ruta para aagregar platos al menú
//! falta validar que sea administrador el único que pueda agregar platos
server.post('/add-dish', mw.verifyLogInToken, mw.validateDishExistence, fx.addDish);

//Listening server
server.listen('3000', ()=>{
    console.log('ready and working!');
});