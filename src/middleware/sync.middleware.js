/**
 * @author Arup Kumar Gupta
 * @email akgupta@ex2india.com
 * @create date 2018-12-01 11:46:55
 * @modify date 2018-12-01 11:46:55
 * @desc database sync middleware - to bypass db syncing in each route request
*/

const {connection} = require('./../db');
const messages = require('../MessageDictionary.json');
const syncDb = async function (req,res,next){
   try{
    await connection.sync();
    next();
   }catch(err){
        console.log(err);
        res.send(500).json({success:false,message:messages.serverError});
   }
}
module.exports = syncDb;