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
const EncryptPassword = require('./user.auth');
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
                searchResult.push(user.toJSON())
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
               return res.json({success:true,user:user.toJSON()});
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
    static async verifyToken(req,res,next){

    }
    static async login(req,res){
        let userCreds = _.pick(req.body,['username','password']);
        try{
            await connection.sync();
            try{
                let userArr = await User.findAll({
                    where:{
                        username:userCreds.username
                    }
                });
                let user = userArr[0];
                if(!user){
                    return res.json({success:false,error:{code:404,message:'No user found'}})
                }
                let verifiedUser = await EncryptPassword.compare(userCreds.password,user.password);
                if(!verifiedUser)
                    return res.json({success:false, error: {code: 403,message:'Forbidden'}});
                //generate auth token
                let token = await EncryptPassword.generateAuthToken(user.toJSON());
                user.token = `Auth ${token}`;
                await user.save();
                res.header('x-auth',user.token).status(200).json({success:true,user:user.toJSON(),auth_token:token});
            }catch(e){
                return res.json({success:false,error:e});
            }  
        }catch(error){
            return res.json({success:false,error})
        }
    }
}

module.exports = UserController