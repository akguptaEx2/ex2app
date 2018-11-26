const request = require('supertest');
const {expect} = require('chai');
const path = require('path');
const srcDir = path.join('..','..','src');
const {connection} = require(path.join(srcDir,'db'));
describe('test user routes',function(){
    var server;
    this.beforeEach(()=>{
        let serverPath = path.join(__dirname,'..','..','src','server');
        server = require(serverPath);
        const {User} = require(path.join(srcDir,'user'));
        connection.sync().then(()=>{
            User.bulkCreate([{
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
        ]).catch((err)=>{});
        }).catch((e)=>{
        });
    });
    this.afterEach(function(){
        
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
});
