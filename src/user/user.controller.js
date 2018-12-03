/**
 * @author Arup Kumar Gupta
 * @email akgupta@ex2india.com
 * @create date 2018-12-01 11:42:55
 * @modify date 2018-12-01 11:42:55
 * @desc User routes controller
*/

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
const {Auth} = require('../middleware');
const {User,UserRole,Role} = require('../db');
const messages = require('../MessageDictionary.json')
class UserController{
    static async getAllUsers(req,res){
        try{
            let users = await User.findAll();
            return res.json({success:true,data:users});
        }catch(err){
            console.log(err);
            return res.status(500).json({success:false,message:messages.serverError});
        }        
    }
    static async getUser(req,res){
        let pattern = req.params['pattern'];
        try{
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
            return res.status(500).json({success:false,message:messages.serverError});
        }
       
    }
    static async createNewUser(req,res){
        let userObj = _.pick(req.body,[
            'email',
            'password',
            'first_name',
            'last_name',
            'employee_code',
            'mobile_number'
        ]);
        let userRole = req.body['role'];
        try{
            let currentUser = req.user.toJSON();
           // fetch valid role from database
           let roles =  await Role.findAll({
               where:{role_value:userRole}
           });
           if(!roles.length)
            return res.status(406).json({success:false,message:messages.invalidRole});
           let userExists = await User.count({where:{
               email:userObj.email
           }});
           if(userExists)
            return res.json({success:false,message: messages.alreadyTaken})
           let user = await User.create(userObj);
           let role = roles[0];
           //add entry to userRole
           await UserRole.create({role_id:role.id,user_id:user.id,created_by:currentUser.id});
           let jsonUser = user.toJSON();
           jsonUser.role = role.role_value;
           return res.json({success:true,data:jsonUser});
        }catch(insertError){
            console.log(insertError);
            return res.status(500).json({success:false,message:messages.serverError});
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
                let userArr = await User.findAll({
                    where:{
                        email:userCreds.email
                    }
                });
                if(!userArr.length){
                    return res.status(404).json({success:false,message:messages.noUserFound});
                }
                let user = userArr[0];
                let verifiedUser = await Auth.compare(userCreds.password,user.password);
                if(!verifiedUser)
                    return res.status(401).json({success:false, message:messages.invalidCredError});
                //generate auth token
                let token = await Auth.generateAuthToken(user);
                user.token = token;
                await user.save();
                res.header('x-auth',user.token).status(200).json({success:true,data:user.toJSON(),auth_token:token});
            }catch(e){
                console.log(e);
                return res.status(403).json({success:false,message:messages.forbiddenError});
            }  
    }

    static async logout(req,res){
        try{
            req.user.removeToken();
            await req.user.save();
            res.json({success:true,message:'Logged out'});
        }catch(err){
            console.log(err);
            res.status(500).json({success:false,message:messages.serverError});
        }
    }
    static async updateProfile(req,res){
        const updateUser = _.pick(req.body,['current_password','password','mobile_number']);
        try{
            let user = req.user;
            

            let verifiedUser = await Auth.compare(updateUser.current_password,user.password);
            if(!verifiedUser){
                return res.status(401).json({success:false,message:messages.invalidCredError});
            }
            user.password = updateUser.password;
            await user.save();
            let token = await Auth.generateAuthToken(user);
            user.token = token;
            let updatedUser = await user.save();
            return res.json({success:true,data:updatedUser});
        }catch(err){
            console.log(err);
            return res.status(500).json({success:false,message:messages.serverError});
        }
        res.json(req.user);
    }
    static async viewProfile(req,res){
        let userId = req.user.id;
        try{
            let userRole = await UserRole.findOne({
                options: {
                    user_id:userId                
                }
            });
            let roleId = userRole.role_id;
            let role = await Role.findById(roleId);
            let user = req.user.toJSON();
            user.role = role.role_value;
            return res.json({success:true,data:user});
        }catch(err){
            console.log(err);
            return res.status(500).json({success:false,message:messages.serverError});
        }
    }
}

module.exports = UserController;