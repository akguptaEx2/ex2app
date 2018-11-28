const { connection, Sequelize } = require('../db');
const EncryptPassword = require('./user.auth');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const User = connection.define('user', {
    first_name: {
        type: Sequelize.STRING(20),
    },
    last_name: {
        type: Sequelize.STRING(20)
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
            notEmpty: true
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    token: {
        type: Sequelize.STRING(255),
        defaultValue:''
    }
});
User.hook('beforeCreate', async function (user, options) {
    //encrypt password here
    try {
        user.password = await EncryptPassword.hash(user.password);
    } catch (e) {
        return connection.Promise.reject(e);
    }
});
User.prototype.toJSON = function () {
    let user = this.dataValues;
    let me = _.pick(user, ['id','email', 'first_name', 'last_name']);
    return me;
}
User.findByToken = function(token){
   let decoded = null;
   try{
       decoded = jwt.verify(token,process.env.JWTSECRETKEY);
   }catch(e){
       connection.Promise.reject('invalid token');
   }
   return this.findAll({where:{
       token:token,
       id:decoded.user.id
   }});
}
User.prototype.removeToken = function(){
    let user = this;
    user.token = '';
}
module.exports = User;