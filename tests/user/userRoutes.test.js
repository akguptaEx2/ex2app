const request = require('supertest');
const {expect} = require('chai');
const path = require('path');
describe('test user routes',function(){
    var server;
    this.beforeEach(()=>{
        let serverPath = path.join(__dirname,'..','..','src','server');
        server = require(serverPath);
    });
    this.afterEach(function(){
        server.close();
    });
    it('should fetch all users from database',(done)=>{
       /*  request(server).get('/users').then((result)=>{
            let body = result.body;
            expect(body).is.not.null;
            expect(body.success).to.be.true;
            expect(body).has.ownProperty('users');
            expect(body.users[0].length).to.eq(7);
            done('TODO');
        }).catch((err)=>{done(err)}); */
        done('TODO');
    });
    it('should fetch users with the given username',(done)=>{
/*         request(server).get('/users/arup').then((user)=>{
            let body = user.body;
            expect(body).is.not.null;
            expect(body.success).to.be.true;
            expect(body).has.ownProperty('users');
            done('TODO');
        }).catch((err)=>{
            done(err);
        }) */
        done('TODO');
    });
    it('should give 404 when no user is found for a username',(done)=>{
        // request(server).get('/users/noName').expect(404,done);
        done('TODO');
    });
});
