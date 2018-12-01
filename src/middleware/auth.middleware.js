/**
 * @author Arup Kumar Gupta
 * @email akgupta@ex2india.com
 * @create date 2018-12-01 11:46:17
 * @modify date 2018-12-01 11:46:17
 * @desc Auth Middleware and encryption methods
*/
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {connection,User} = require('../db');
const messages = require('../MessageDictionary.json');
class Auth{
    static hash(plain){
        return new Promise((resolve,reject)=>{
            bcrypt.genSalt(10,(err,salt)=>{
                if(err)
                    return reject(err);
                bcrypt.hash(plain,salt,(er,hash)=>{
                    if(er)
                        return reject(er);
                    return resolve(hash);
                });
            })
        });
    }
    static compare(plain,hash){
        return new Promise((resolve,reject)=>{
            bcrypt.compare(plain,hash,(err,success)=>{
                if(err)
                    return reject(err);
                return resolve(success);
            });
        });
    }
    static async generateAuthToken(user){
        return new Promise((resolve,reject)=>{
            jwt.sign({user},process.env.JWTSECRETKEY,(err,token)=>{
                if(err){
                    return reject({success:false,message:messages.forbiddenError});
                }
                resolve(token);
            });
        }); 
    }
    static async authMiddleware(req,res,next){
        try{
            let token = req.headers['x-auth'];
            await connection.sync();
            let user = null;
            try{
                 user = await User.findByToken(token);
            }catch(e){
                console.log(e);
            return res.status(401).json({success:false,message:messages.unauthorizedError});
                
            }
            if(!user.length){
            return res.status(401).json({success:false,message:messages.unauthorizedError});
            }
            user = user[0];
            req.user = user;
            req.token = token;
            next();
        }catch(err){
            console.log(err);
            res.status(401).json({success:false,message:messages.unauthorizedError});
        } 
    }
}
module.exports = Auth;