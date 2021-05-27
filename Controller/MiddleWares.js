const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://xiztzhwh:lMg5XhdRbj3lp8fb_X-3X5eh9PX06vza@ziggy.db.elephantsql.com:5432/xiztzhwh');
const env = require('../Variables/env');
const jwt = require('jsonwebtoken');

// MiddleWare para validar la existencia del usuario en la base de datos
async function validateExistence(req, res, next){
    try{
        const { username, email } = req.body;
        const [user_database] = await sequelize.query(
            `SELECT * FROM user_database`,
            { raw: true },
        );
        
        const user = user_database.find( item => item.username == username || item.email == email);
        const userExist = Boolean(user);

        if(!userExist){
            next();
        }else{
            throw 'Este usuario ya existe en la base de datos';
        };
    }catch(fail){
        res.json({ Error: fail });
    };
};

async function validateLogin(req, res, next){
    try{
        const { username, email, password } = req.body;
        const [user_database] = await sequelize.query(
            `SELECT * FROM user_database`,
            { raw: true },
        );
            console.log(username, email, password);

        const usernameAndPassword = Boolean(user_database.find( item => item.username == username && item.password == password));
        const emailAndPassword = Boolean(user_database.find( item => item.email == email && item.password == password));

        if(usernameAndPassword){
            console.log('get it user')
            next();
        }else if(emailAndPassword){
            console.log('get it email')
            next();
        }else{
            throw "Has ingresado algo incorrecto";
        }

    }catch(fail){
        res.json({ Error: fail });
    };
};

function verifyLogInToken(req, res, next){
    try{
        const token = req.headers.authorization.split(' ')[1];
        const verifyToken = jwt.verify(token, env.secretSign);

        if(verifyToken){
            req.username = verifyToken;
            next();
        }else{
            throw 'No tienes permisos';
        };
    }catch(fail){
        res.json({ Error: fail });
    }
};

async function validateDishExistence(req, res, next){
    try{
        const { dish_name } = req.body;
        const [dishes] = await sequelize.query(
            `SELECT * FROM dishes`,
            { raw: true },
        );
        console.log(dishes)
        const dish = dishes.find( item => item.dish_name == dish_name);
        const dishExist = Boolean(dish);

        
        if(!dishExist){
            next();
        }else{
            throw 'Este plato ya existe en la base de datos';
        };
    }catch(fail){
        res.json({ Error: fail });
    };
};

module.exports = {
    validateExistence,
    validateDishExistence,
    validateLogin,
    verifyLogInToken
};