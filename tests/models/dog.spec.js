const { Dog, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Dog.create({
          name: null,
          height: '162 - 190',
          weight: '523 - 765',
          life_span: '10 - 20'
        })
          .then((res)=> done(new Error('It requires a valid name')))
          .catch((e) => done());
      });

      it('should throw an error if height is null', (done) => {
        Dog.create({
          name: 'Bulldog',
          height: null,
          weight: '12 - 12',
          life_span: '14 - 16'
        })
          .then((res)=> done(new Error('It requires a valid height')))
          .catch((e) => done());
      });

      it('should throw an error if weight is null', (done) => {
        Dog.create({
          name: 'Bulldog',
          height: '18 - 22',
          weight: null,
          life_span: '12 - 15'
        })
          .then((res)=> done(new Error('It requires a valid weight')))
          .catch((e) => done());
      });

      it('should throw an error if life_span is undefined', (done) => {
        Dog.create({
          name: 'Bulldog',
          height: '22 - 29',
          weight: null,
          life_span: undefined
        })
          .then((res)=> done(new Error('It requires a valid life_span value')))
          .catch((e) => done());
      });

      it('should work when its a valid name', () => {
        Dog.create({ 
          name: 'Bulldog',
          height: '15 - 18',
          weight: '21 - 26',
          life_span: '10 - 12'
        })
          .then((res) => expect(res).toBe(200))
          .catch(() => done())
      });  
    
    });
  });
});
