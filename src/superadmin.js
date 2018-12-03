const {connection,User,Role,UserRole} = require('./db');
async function createSuperAdmin(){
    try{
        await connection.sync();
        let user = await User.findById(1);
        if(!user){
            user = await User.create({employee_code:'NULL',
            first_name:'Admin',email:'admin@admin.com',
            password:'admin',is_active:true});
        }
        let role = await Role.findAll({where:{role_value:'admin'}});
        if(!role.length){
            //create admin role
            role = await Role.create({role_value:'admin',is_active:true});
        }
        //if user already exists
        user.password = 'admin';
        user.employee_code = 'NULL',
        user.first_name = 'Admin',
        user.email = 'admin@admin.com',
        user.is_active = true;
        user = await user.save();
        //associate user with role
        let entryExists = await UserRole.count({where:{
            $and:[
                {user_id:user.id},{role_id:role.id}
            ]
        }});
        if(entryExists == 0)
            await UserRole.create({user_id:user.id,role_id:role.id});
    }catch(err){return console.log(err)
    };
    await connection.sync();

}
createSuperAdmin();