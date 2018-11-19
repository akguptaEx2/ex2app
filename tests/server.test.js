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