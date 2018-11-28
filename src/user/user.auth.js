const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class EncryptPassword{
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
                    return reject({success:false,error:{code:403,message:'Forbidden'}});
                }
                resolve(token);
            });
        }); 
    }

}
module.exports = EncryptPassword;