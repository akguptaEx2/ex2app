const router = require('express')();
router.get('/',(req,res)=>{
    res.json({success:true,message:'Method not implemented'});
});
//Creating new user
router.post('/new',(req,res)=>{
    //TODO
    res.json({success:true,message:'Method not implemented'});
});
router.get('/:username',(req,res)=>{
   res.json({success:true,message:'Method not implemented'});

});
//delete user by username
router.delete('/:username',(req,res)=>{
    //TODO
    res.json({success:true,message:'Method not implemented'});
});
//update user by username
router.patch('/:username',(req,res)=>{
    //TODO
    res.json({success:true,message:'Method not implemented'});
});
module.exports = router;