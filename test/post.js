const Post = require('../models/post');
const chai = require('chai');
const should = chai.should();

process.env.NODE_ENV = 'test';

describe('Posts', () => {
    beforeEach((done) => { //Before each test we empty the database
        done();
    });

  describe('Create a Post', () => {
      it('it should Create a Post', (done) => {
          const post = new Post();
          post.should.be.a('object');
          done();
      });
  });
});