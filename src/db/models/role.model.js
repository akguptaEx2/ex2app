/**
 * @author Arup Kumar Gupta
 * @email akgupta@ex2india.com
 * @create date 2018-12-01 11:43:41
 * @modify date 2018-12-01 11:43:41
 * @desc roles model
*/

const { connection, Sequelize } = require('../connection');
const _ = require('lodash');
const Role = connection.define('Role',{
    role_value: {
        type:Sequelize.STRING,
        unique:true
    },
    is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
    }
});
Role.prototype.toJSON = function(){
    let role = this.dataValues;
    console.log(role);
    let r = _.pick(role, ['id','role_value', 'is_active']);
    return r;
}
module.exports = Role;