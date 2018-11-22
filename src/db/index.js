const fs = require('fs');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
var connection = null;
if(config.useEnv){
    connection = new Sequelize(process.env[config.useEnv]);
}else{
    connection = new Sequelize(config.database,config.username,config.password,{dialect: config.dialect,host:config.host});
}
module.exports = {connection,Sequelize};