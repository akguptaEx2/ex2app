const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const cors = require('cors');
const express = require('express');
const app = express();
const path = require('path');
const {userRoutes} = require('./user');
const {Sequelize,connection} = require('./db');
app.use(express.static(path.join(__dirname,'..','public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());
app.use(function(req, res, next) {
   res.header('api-version','1.0');
   next();
});
app.use('/users',userRoutes);
module.exports = {app,port,userRoutes,Sequelize,connection};