const {connection, Sequelize} = require('../db');
const User = connection.define('user',{
    username: {
        type: Sequelize.STRING(40),
        unique:true,
        allowNull:false,
    },
    first_name: {
        type: Sequelize.STRING(20),
        allowNull: false,
    },
    last_name:{
        type:Sequelize.STRING(20)
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        validate:{
            isEmail:true,
            notEmpty:true
        }
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    }
});
module.exports = User;