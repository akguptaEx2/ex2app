const request = require('supertest');
const {expect} = require('chai');
describe('it should create a server',function(){
    var server;
    this.beforeEach(function(){
        server = require('../src/server');
    });
    this.afterEach(function(){
        server.close();
    });
    it('should respond to / GET request',function(done){
        request(server).get('/').expect(200,done);
    });
    it('should 404 any invalid request',function(done){
        request(server).get('/invalidPath').expect(404,done);
    });
});
describe('get request for users',function(){
    var server;
    this.beforeEach(function(){
        server = require('../src/server');
    });
    this.afterEach(function(){
        server.close();
    });
    it('should fetch all users from database',function(done){
        request(server).get('/users').then((result)=>{
            let body = result.body;
            expect(body).is.not.null;
            expect(body.success).to.be.true;
            expect(body).has.ownProperty('users');
            expect(body.users[0].length).to.eq(7);
            done();
        }).catch((err)=>{done(err)});
    });
});