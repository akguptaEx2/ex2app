/**
 * @author Arup Kumar Gupta
 * @email akgupta@ex2india.com
 * @create date 2018-12-01 11:45:47
 * @modify date 2018-12-01 11:45:47
 * @desc db barrel
*/

const {connection, Sequelize} = require('./connection');
const {User,UserRole,Role} =  require('./models');
module.exports = {
    connection,Sequelize,User,UserRole,Role
}