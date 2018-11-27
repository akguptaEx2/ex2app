'use-strict';
/*
    * the api routes BL are written here
    *each route will send a json in the give below format
    *response = {success: True/False, 
        users?:[], 
        error?:{}/String,
        user?:{}
    }
    *? being optional and atleast any one of them is needed to be returned in response
    *res.json(response)
 */
const _ = require('lodash');
const User = require('./user.model');
const {connection,Sequelize} = require('../db');
const Op = Sequelize.Op;
class UserController{
    static async getAllUsers(req,res){
        try{
            let users = await User.findAll();
            return res.json({success:true,users});
        }catch(err){
            return res.json({success:false,error:err});
        }        
    }
    static async getUser(req,res){

        let username = req.params['username'];
        try{
            let users = await User.findAll({
                where:{
                    username:{
                        [Op.like]: `%${username}%`
                    }
                }
            });
            let searchResult = [];
            users.forEach(function(user){
                searchResult.push(user.dataValues)
            });
            res.json({success:true,users:searchResult});

        }catch(e){
            return res.json({success:false,message:e});
        }
       
    }
    static async createNewUser(req,res){
        try{
            await connection.sync();
            let userObj = _.pick(req.body,['username','first_name','last_name','email','password']);
            try{
               let user = await User.create(userObj);
               return res.json({success:true,user:user.dataValues});
            }catch(insertError){
                return res.json({success:false,error:insertError});
            }
        }catch(err){
            return res.json({success:false,error:err});
        }
    }
    static async deleteUser(req,res){
        res.json({success:true,message:'Method not implemented'});
    }
    static async updateUser(req,res){
        res.json({success:true,message:'Method not implemented'});
    }
}

module.exports = UserController