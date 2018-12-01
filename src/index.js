/**
 * @author Arup Kumar Gupta
 * @email akgupta@ex2india.com
 * @create date 2018-12-01 11:50:38
 * @modify date 2018-12-01 11:50:38
 * @desc Server Barrel - used to manage all imports required by server.js
*/

const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const cors = require('cors');
const express = require('express');
const app = express();
const path = require('path');
const {Auth} = require('./middleware');
const {userRoutes} = require('./user');
const {roleRoutes} = require('./roles');
const {Sequelize,connection} = require('./db');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());
app.use(function(req, res, next) {
   res.header('api-version','1.0');
   next();
});
app.use('/api/users',userRoutes);
app.use('/api/roles',Auth.authMiddleware,roleRoutes);
connection.sync();
module.exports = {app,port,userRoutes,roleRoutes,Sequelize,connection};