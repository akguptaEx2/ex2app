const {connection, Sequelize} = require('../db');
const EncryptPassword = require('./user.auth');
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
User.hook('beforeCreate',async function(user,options){
    //encrypt password here
   try{
       user.password = await EncryptPassword.hash(user.password);
   }catch(e){
        return connection.Promise.reject(e);
   }
});
module.exports = User;