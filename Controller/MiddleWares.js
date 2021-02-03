const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://xiztzhwh:lMg5XhdRbj3lp8fb_X-3X5eh9PX06vza@ziggy.db.elephantsql.com:5432/xiztzhwh');
// const secretSign = require('../Variables/env');

async function validateExistence(req, res, next){
    try{
        const { username, email } = req.body;
        const [user_database] = await sequelize.query(
            `SELECT * FROM user_database`,
            { raw: true },
        );
        
        const user = user_database.find( item => item.username == username || item.email == email);
        const userExist = Boolean(user);
            console.log('entra', userExist)
        if(!userExist){
            console.log('Usuario nuevo');
            next();
        }else{
            throw 'Usuario ya existe en la base de datos';
        };
    }catch(fail){
        res.json({ Error: fail });
    };
}

module.exports = {
    validateExistence
};