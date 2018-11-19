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
