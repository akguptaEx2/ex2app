const path = require('path');
const ENV = {
    development:{
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user:'arup',
            password: 'arup',
            database: 'ex2app'
        },
        migrations: {
            directory: path.join(__dirname,'db','migrations')
        },
        seeds: {
            directory: path.join(__dirname,'db','seeds')
        }
    }
};
module.exports = ENV;