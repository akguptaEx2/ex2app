const { connection, Sequelize } = require('../db');
const EncryptPassword = require('./user.auth');
const _ = require('lodash');
const User = connection.define('user', {
    username: {
        type: Sequelize.STRING(40),
        unique: true,
        allowNull: false,
    },
    first_name: {
        type: Sequelize.STRING(20),
        allowNull: false,
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
        type: Sequelize.STRING(1024)
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
User.prototype
    .toJSON = function () {
        let user = this.dataValues;
        let me = _.pick(user, ['username', 'email', 'first_name', 'last_name']);
        return me;
    }
module.exports = User;