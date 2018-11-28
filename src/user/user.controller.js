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
    static async getAllUsers(req,res){
        try{
            let users = await User.findAll();
            return res.json({success:true,data:users});
        }catch(err){
            return res.status(500).json({success:false,message:err.errors[0].message});
        }        
    }
    static async getUser(req,res){

        let email = req.params['email'];
        try{
            let users = await User.findAll({
                where:{
                    email:{
                        [Op.like]: `%${email}%`
                    }
                }
            });
            let searchResult = [];
            users.forEach(function(user){
                searchResult.push(user.toJSON())
            });
            res.json({success:true,data:searchResult});

        }catch(e){
            return res.status(500).json({success:false,message:e.errors[0].message});
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
                return res.status(500).json({success:false,message:insertError.errors[0].message});
            }
        }catch(err){
            return res.status(500).json({success:false,message:err.errors[0].message});
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
                    return res.status(404).json({success:false,message:'No user found'});
                }
                let verifiedUser = await EncryptPassword.compare(userCreds.password,user.password);
                if(!verifiedUser)
                    return res.status(401).json({success:false, message:'Invalid credentials'});
                //generate auth token
                let token = await EncryptPassword.generateAuthToken(user);
                user.token = token;
                await user.save();
                res.header('x-auth',user.token).status(200).json({success:true,data:user.toJSON(),auth_token:token});
            }catch(e){
                console.log(e);
                return res.status(403).json({success:false,message:e});
            }  
        }catch(error){
            console.log(error);
            return res.status(500).json({success:false,error:error});
        }
    }

    static async logout(req,res){
    
        try{
            await connection.sync();
            req.user.removeToken();
            await req.user.save();
            res.json({success:true,message:'Logged out'});
        }catch(err){
            res.status(500).json({success:false,message:err});
        }
    }
    static async authMiddleware(req,res,next){
        try{
            let token = req.headers['x-auth'];
            await connection.sync();
            let user;
            try{
                user = await User.findByToken(token);
            }catch(e){
                console.log(e);
                res.json({e});
            }
            if(!user.length){
            return res.status(401).json({success:false,message:'Unauthorized'})
            }
            user = user[0];
            req.user = user;
            req.token = token;
            next();
        }catch(err){
            res.status(401).json({success:false,message:'Unauthorized'})
        } 
    }
}

module.exports = UserController