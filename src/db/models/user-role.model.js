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
UserRole.findOne = async function (options) {
    try {
        let results = await this.findAll({ limit: 1, where: options.options, attributes: options.attributes });
        return new Promise((resolve, reject) => {
            if (!results.length)
                return resolve({});
            return resolve(results[0]);
        });
    } catch (err) { console.log(err); return Sequelize.Promise.reject('Server Error'); }
}
module.exports = UserRole;