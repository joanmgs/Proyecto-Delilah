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
// Ruta de registro
server.post('/signup', mw.validateExistence, fx.signUpUser);
// Ruta de login

//Listening server
server.listen('3000', ()=>{
    console.log('ready and working!');
});