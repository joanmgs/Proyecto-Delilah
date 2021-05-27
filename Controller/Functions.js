const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://xiztzhwh:lMg5XhdRbj3lp8fb_X-3X5eh9PX06vza@ziggy.db.elephantsql.com:5432/xiztzhwh');
const mysql2 = require('mysql2');
const jwt = require('jsonwebtoken');
//Variable de entorno
const env = require('../Variables/env');

// Función de registro
async function signUpUser(req, res){
    try{
        const {username, name_lastname, email, phone, address, password} = req.body;
        console.log(req.body)
        const data = await sequelize.query(
            'INSERT INTO user_database (username, name_lastname, email, phone, address, password) VALUES (?, ?, ?, ?, ?, ?)', 
            { replacements: [username, name_lastname, email, phone, address, password] });
        res.send(data);
    }catch(fail){
        res.json({ Error: fail });
    };
};

// Obtener la tabla de usuarios de la base de datos
async function usuarios(req, res){
    const [usuarios] = await sequelize.query(
        `SELECT * FROM user_database`,
        { raw: true },
    );
    console.log(usuarios);
    res.send(usuarios);
};
// Obtener la tabla de platos de la base de datos
async function menu(req, res){
    const [dishes] = await sequelize.query(
        `SELECT * FROM dishes`,
        { raw: true },
    );
    console.log(dishes);
    res.send(dishes);
};

function logInToken(req, res){
    const { username } = req.body;
    
    const token = jwt.sign({
        username 
    }, env.secretSign);

    res.json({ token });
};

// Función de administrador - Agregar plato a menú
async function addDish(req, res){
    try{
        const { image, dish_name, price } = req.body;
        console.log(req.body)
        const data = await sequelize.query(
            'INSERT INTO dishes (image, dish_name, price) VALUES (?, ?, ?)', 
            { replacements: [image, dish_name, price] }
            );
        res.send(data);
    }catch(fail){
        res.json({ Error: fail });
    };
};



module.exports = {
    signUpUser,
    usuarios,
    logInToken,
    menu,
    addDish
};