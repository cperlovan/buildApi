/* eslint-disable import/no-extraneous-dependencies */
const supertest = require("supertest");


const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, Temperament, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  name: 'Pug',
};

describe('Dog routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create(dog)));
  describe('GET /dogs', () => {
    it('should get 200', () =>
      agent.get('/dogs').expect(200)
    );
  });
});


describe("GET /temperament", function () {
  it("it should has status code 200", function (done) {
    supertest(app)
      .get("/temperament")
      .expect(200)
      .end(function (err, res) {
        if (err) done(err);
        done();
      });
  });
});

describe("GET /dogs/:ID", function () {
  it("it should has status code 200", function (done) {
    supertest(app)
      .get("/dogs/11")
      .expect(200)
      .end(function (err, res) {
        if (err) done(err);
        done();
      });
  });
});
describe("GET /dogs?name=", function () {
  it("it should has status code 200", function (done) {
    supertest(app)
      .get("/dogs?name=bulldog")
      .expect(200)
      .end(function (err, res) {
        if (err) done(err);
        done();
      });
  });
});

describe("GET /wrong page", function () {
  it("it should has status code 404", function (done) {
    supertest(app)
      .get("/sgod")
      .expect(404)
      .end(function (err, res) {
        if (err) done(err);
        done();
      });
  });
});

