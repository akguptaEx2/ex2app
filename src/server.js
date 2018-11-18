const {app,knex,port}  = require('./index');
app.get('/',(req,res)=>{
    res.status(200).send({success: true});
});
app.get('/users',(req,res)=>{
    knex.raw('select * from users').then((users)=>{
        res.status(200).json({success: true,users});
    }).catch((err)=>{
        res.status(500).json({success:false,message: err});
    });
});
app.get('/uses/:username',(req,res)=>{
    let username = req.params.username;
    res.status(200).json({success:true,user:{}});
    //TODO fetch user
});
const server = app.listen(port,function(err){
    if(err)
        throw err;
    console.log(`Started Listening to port ${port}`);
});
module.exports = server;
