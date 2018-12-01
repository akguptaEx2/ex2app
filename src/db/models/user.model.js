/**
 * @author Arup Kumar Gupta
 * @email akgupta@ex2india.com
 * @create date 2018-12-01 11:45:02
 * @modify date 2018-12-01 11:45:02
 * @desc User Model
*/

const { connection, Sequelize } = require('../connection');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const User = connection.define('User',{
    employee_code: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique:true
    },
    first_name: {
        type: Sequelize.STRING(100),
        allowNull:false
    },
    last_name:{
        type:Sequelize.STRING(100),
    },
    email:{
        type: Sequelize.STRING(100),
        allowNull:false,
        unique:true,
        validate:{
            isEmail: true,
            notEmpty: true
        },
    },
    password: {
        type:Sequelize.STRING,
        allowNull:false
    },
    last_logged_on:{
        type: Sequelize.DATE
    },
    created_by:{
        type:Sequelize.INTEGER
    },
    mobile_number:{
        type: Sequelize.STRING(200),
        allowNull:false,
    },
    token:{
        type: Sequelize.STRING(255),
        defaultValue:''
    },
    device_token:{
        type: Sequelize.STRING(255),
        defaultValue:''
    },
    device_type:{
        type: Sequelize.STRING,
        defaultValue:''
    },
    is_active:{
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
});
User.addHook('beforeCreate', async function (user, options) {
    const {Auth} = require('../../middleware');
    //encrypt password here
    try {
        user.password = await Auth.hash(user.password);
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
      return connection.Promise.reject('invalid token');
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