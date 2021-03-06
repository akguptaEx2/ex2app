const request = require('supertest');
const {expect} = require('chai');
const path = require('path');
const srcDir = path.join('..','..');
const {connection} = require(path.join(srcDir,'db'));
const {User} = require(path.join(srcDir,'user'));
const seedTestData = require('./seed/user.seed');
describe('test user routes',function(){
    var server;
    this.beforeEach(()=>{
        let serverPath = path.join(srcDir,'server');
        server = require(serverPath);   
        seedTestData();
    });
    this.afterEach(()=>{
        connection.sync().then(()=>{
            User.destroy({truncate:true});
        }); 
    });
    it('should fetch all users from database',(done)=>{
        request(server).get('/users').then((result)=>{
            let body = result.body;
            expect(body).to.be.an('object');
            expect(body.success).to.be.true;
            expect(body).has.ownProperty('users');
            let users = body.users;
            if(!users.length)
                return done();
            expect(users).to.be.an('array');
            expect(users[0]).has.ownProperty('username');
            done();
        }).catch((err)=>{done(err)});
    });
    it('should fetch users with the given username',(done)=>{
        request(server).get('/users/test').then((result)=>{
            let body = result.body;
            expect(body.success).to.be.true;
            expect(body).to.be.an('object');
            expect(body).has.ownProperty('users');
            expect(body.users.length).greaterThan(0);
            done();
        }).catch((err)=>{
            done(err);
        })
        // done('TODO');
    });
    it('should return empty users when no user is found for a username',(done)=>{
        request(server).get('/users/noName').then((result)=>{
            let body = result.body;
            expect(body.success).to.be.true;
            expect(body).to.be.an('object');
            expect(body).has.ownProperty('users');
            expect(body.users.length).to.eq(0);
            done();
        }).catch(err=>done(err));
    });
    it('should create a new user',(done)=>{
        let userObject = {
            username: 'testuser',
            first_name: 'test',
            last_name: 'user',
            email: 'test@user.com',
            password: 'testuserpwd'
        }
        request(server).post('/users/new').send(userObject).then((result)=>{
           expect(result.status).to.eq(200);
           User.findOne({
               where:{username:userObject.username},
               attributes:['username','first_name','last_name','password']
           }).then((user)=>{
                if(!user.dataValues)
                    return done('Database not updated');
               let thisUser = user.dataValues;
               expect(thisUser.username).to.eq('testuser');
               expect(thisUser.password).to.not.eq('testuserpwd');
               return done();
           }).catch(e=>done(e));

        }).catch(err=>done(err));
        
    });
    it('should login user for valid username and password',(done)=>{
        //create a user in test db 
        request(server).post('/users/login').send({username:'testfour',password:'testfour'}).then((res)=>{
            console.log(res.body);
            done();
        }).catch(err=>done(err));
    });
});
