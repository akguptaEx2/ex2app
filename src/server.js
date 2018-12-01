/**
 * @author Arup Kumar Gupta
 * @email akgupta@ex2india.com
 * @create date 2018-12-01 11:52:20
 * @modify date 2018-12-01 11:52:20
 * @desc Starting point of API
*/

const {app,port}  = require('./index');
app.get('/',(req,res)=>{
    res.status(200).send({success: true});
});
const server = app.listen(port,function(err){
    if(err)
        throw err;
    console.log(`Started Listening to port ${port}`);
});
module.exports = server;
