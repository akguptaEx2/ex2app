const path = require('path');
const srcDir = path.join('..','..','..');
const {connection} = require(path.join(srcDir,'db'));
const {User} = require(path.join(srcDir,'user'));
const USERS = [{
    username: 'testone',
    first_name:'Testone',
    last_name:'one',
    email:'test@one.com',
    password:'testone'
},
{
    username: 'testtwo',
    first_name:'Testtwo',
    last_name:'two',
    email:'test@two.com',
    password:'testtwo'
},
{
    username: 'testthree',
    first_name:'Testthree',
    last_name:'three',
    email:'test@three.com',
    password:'testthree'
},
{
    username: 'testfour',
    first_name:'Testfour',
    last_name:'four',
    email:'test@four.com',
    password:'testfour'
}
];
async function seedTestData(){
    try{
       await connection.sync();
        USERS.forEach(async function(user,index){
            await User.create(USERS[index]);
        });
    }catch(e){
        connection.Promise.reject(e);
    };
}
module.exports = seedTestData;