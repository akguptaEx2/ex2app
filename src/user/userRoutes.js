const router = require('express')();
const knex = require('../db/knex');
router.get('/',(req,res)=>{
    knex.raw('select * from users').then((users)=>{
        res.status(200).json({success: true,users});
    }).catch((err)=>{
        res.status(500).json({success:false,message: err});
    });
});
router.get('/:username',(req,res)=>{
    let username = req.params.username;
    knex('users').select(knex.raw('username, id, first_name, last_name'))
    .where('username','like',`%${username}%`)
    .then((user)=>{
    if(!user.length){
        return res.status(404).send({success:true,user:[]});
    }
    res.json({success:true,'users':user});
   }).catch((err)=>{
       res.status(500).json({success:false,message:err});
   });
});
module.exports = router;