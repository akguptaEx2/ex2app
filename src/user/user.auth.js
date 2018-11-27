const bcrypt = require('bcryptjs');
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

}
module.exports = EncryptPassword;