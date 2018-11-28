const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('./../config/config.json');
const envConfig = config[env];
console.log(envConfig);
process.env.JWTSECRETKEY = config.JWTSECRETKEY;
var connection = null;
connection = new Sequelize(envConfig.database,envConfig.username,envConfig.password,{dialect: envConfig.dialect,host:envConfig.host,logging:false});
module.exports = {connection,Sequelize};