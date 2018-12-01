/**
 * @author Arup Kumar Gupta
 * @email  akgupta@ex2india.com
 * @create date 2018-12-01 11:40:39
 * @modify date 2018-12-01 11:40:39
 * @desc   Role Routes Controller
*/

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
const {Role} = require('../db');
const messages = require('./../MessageDictionary.json');
class RolesController{
    constructor(){
        //initialize instance variables
        this.serverError = 'Server Error';
    }
    static async getRoles(req,res){
        
       try{
           let roles = await Role.findAll();
           res.json({success:true,data: roles});
       }catch(err){
           res.json({success:false,message: messages.serverError})
       }
    }
    static async createRole(req,res){
        let rolesObj = _.pick(req.body,['role_value','is_active']);
        console.log(rolesObj);
        try{
            let role = await Role.create(rolesObj);
            return res.json({success:true,data:role.toJSON()});
        }catch(err){
            console.log(err);
            return res.status(500).json({success:false,err:this.serverError});
        }
    }
    static async deleteRole(req,res){
        res.json({success:false, message: 'Not Implemented'});
    }

}

module.exports = RolesController;