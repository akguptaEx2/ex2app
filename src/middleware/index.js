/**
 * @author Arup Kumar Gupta
 * @email akgupta@ex2india.com
 * @create date 2018-12-01 11:46:41
 * @modify date 2018-12-01 11:46:41
 * @desc middleware barrel
*/
const Auth = require('./auth.middleware');
const SyncDb = require('./sync.middleware');
module.exports = {
   Auth,SyncDb
}
