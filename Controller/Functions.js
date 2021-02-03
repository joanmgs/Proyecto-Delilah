const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://xiztzhwh:lMg5XhdRbj3lp8fb_X-3X5eh9PX06vza@ziggy.db.elephantsql.com:5432/xiztzhwh');
const mysql2 = require('mysql2');

async function signUpUser(req, res){
    const {username, name_lastname, email, phone, address, password} = req.body;
    console.log(req.body)
    const data = await sequelize.query(
        'INSERT INTO user_database (username, name_lastname, email, phone, address, password) VALUES (?, ?, ?, ?, ?, ?)', 
        { replacements: [username, name_lastname, email, phone, address, password] });
    res.send(data);
};

async function usuarios(req, res){
    const [usuarios] = await sequelize.query(
        `SELECT * FROM user_database`,
        { raw: true },
    );
    console.log(usuarios);
    res.send(usuarios);
};

module.exports = {
    signUpUser,
    usuarios
};