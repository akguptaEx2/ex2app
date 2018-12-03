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
Role.findOne = async function (options) {
    try {
        let results = await this.findAll({ limit: 1, where: options.options, attributes: options.attributes });
        return new Promise((resolve, reject) => {
            if (!results.length)
                return resolve({});
            return resolve(results[0]);
        });
    } catch (err) { console.log(err); return Sequelize.Promise.reject('Server Error'); }
}
module.exports = Role;