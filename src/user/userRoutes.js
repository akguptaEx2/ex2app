const router = require('express')();
router.get('/',(req,res)=>{
   /*  knex.raw('select * from users').then((users)=>{
        res.status(200).json({success: true,users});
    }).catch((err)=>{
        res.status(500).json({success:false,message: err});
    }); */
    res.json({success:true,message:'Method not implemented'});
});
//Creating new user
router.post('/new',(req,res)=>{
    //TODO
    res.json({success:true,message:'Method not implemented'});
});
router.get('/:username',(req,res)=>{
   /*  let username = req.params.username;
    knex('users').select(knex.raw('username, id, first_name, last_name'))
    .where('username','like',`%${username}%`)
    .then((user)=>{
    if(!user.length){
        return res.status(404).send({success:true,user:[]});
    }
    res.json({success:true,'users':user});
   }).catch((err)=>{
       res.status(500).json({success:false,message:err});
   }); */
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