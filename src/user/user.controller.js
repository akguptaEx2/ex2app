'use-strict';
/*
    * the api routes BL are written here
    *each route will send a json in the give below format
    *response = {
        success: True/False, 
        message: String
        data: {}/[]
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
    constructor(){
        this.serverError = 'Server Error';
        this.unauthorizedError = 'Unauthorized';
        this.forbiddenError = 'Forbidden';
        this.notFoundError = 'No user found';
        this.invalidCredError = 'Invalid credentials';
    }
    static async getAllUsers(req,res){
        try{
            await connection.sync();
            let users = await User.findAll();
            return res.json({success:true,data:users});
        }catch(err){
            console.log(err);
            return res.status(500).json({success:false,message:this.serverError});
        }        
    }
    static async getUser(req,res){

        let pattern = req.params['pattern'];
        try{
            await connection.sync();
            let users = await User.findAll({
                where:{
                    $or: [
                       {
                        email:{
                            $like: [`%${pattern}%`]
                        }
                       },
                       {
                        first_name:{
                            $like: [`%${pattern}%`]
                        }
                       },
                       {
                        last_name:{
                            $like: [`%${pattern}%`]
                        }
                       }
                    ]
                }
            });
            let searchResult = [];
            users.forEach(function(user){
                searchResult.push(user.toJSON());
            });
            res.json({success:true,data:searchResult});

        }catch(e){
            console.log(e);
            return res.status(500).json({success:false,message:this.serverError});
        }
       
    }
    static async createNewUser(req,res){
        try{
            await connection.sync();
            let userObj = _.pick(req.body,['email','password']);
            try{
               let user = await User.create(userObj);
               return res.json({success:true,data:user.toJSON()});
            }catch(insertError){
                console.log(insertError);
                return res.status(500).json({success:false,message:this.serverError});
            }
        }catch(err){
            console.log(err);
            return res.status(500).json({success:false,message:this.serverError});
        }
    }
    static async deleteUser(req,res){
        res.json({success:false,message:'Method not implemented'});
    }
    static async updateUser(req,res){
        res.json({success:false,message:'Method not implemented'});
    }
    static async login(req,res){
        let userCreds = _.pick(req.body,['email','password']);
        try{
            await connection.sync();
            try{
                let userArr = await User.findAll({
                    where:{
                        email:userCreds.email
                    }
                });
                let user = userArr[0];
                if(!user){
                    return res.status(404).json({success:false,message:this.notFoundError});
                }
                let verifiedUser = await EncryptPassword.compare(userCreds.password,user.password);
                if(!verifiedUser)
                    return res.status(401).json({success:false, message:this.invalidCredError});
                //generate auth token
                let token = await EncryptPassword.generateAuthToken(user);
                user.token = token;
                await user.save();
                res.header('x-auth',user.token).status(200).json({success:true,data:user.toJSON(),auth_token:token});
            }catch(e){
                console.log(e);
                return res.status(403).json({success:false,message:this.forbiddenError});
            }  
        }catch(error){
            console.log(error);
            return res.status(500).json({success:false,message:this.serverError});
        }
    }

    static async logout(req,res){
    
        try{
            await connection.sync();
            req.user.removeToken();
            await req.user.save();
            res.json({success:true,message:'Logged out'});
        }catch(err){
            console.log(err);
            res.status(500).json({success:false,message:this.serverError});
        }
    }
    static async authMiddleware(req,res,next){
        try{
            let token = req.headers['x-auth'];
            await connection.sync();
            user = await User.findByToken(token);
            if(!user.length){
            return res.status(401).json({success:false,message:this.unauthorizedError});
            }
            user = user[0];
            req.user = user;
            req.token = token;
            next();
        }catch(err){
            res.status(401).json({success:false,message:this.unauthorizedError});
        } 
    }
}

module.exports = UserController;