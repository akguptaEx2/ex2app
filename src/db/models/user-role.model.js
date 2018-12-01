/**
 * @author Arup Kumar Gupta
 * @email akgupta@ex2india.com
 * @create date 2018-12-01 11:44:38
 * @modify date 2018-12-01 11:44:38
 * @desc UserRoles Model
*/

const { connection, Sequelize } = require('../connection');
const UserRole = connection.define('UserRole',{
    user_id:Sequelize.INTEGER,
    role_id:Sequelize.INTEGER,
    created_by:Sequelize.INTEGER
});
module.exports = UserRole;