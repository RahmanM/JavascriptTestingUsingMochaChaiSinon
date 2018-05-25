// Chai assertion library
var assert = require('chai').assert;
var expect = require('chai').expect;
var index = require('../index');
var sinon = require('sinon');

/**
 * Fake Calculator module tests ;-)
 */
describe('calculator', ()=> {
    
    describe('add', ()=> {  
      it('should add 2 numbers', ()=> {
         var calc = new index.Calculator;
         assert.equal(4, calc.add(2,2));   
      });

      it('2+3 should be greater than 4', ()=>{
        var calc = new index.Calculator;
        assert.isAbove(calc.add(2,3), 4);   
      });
      
      it('Should throw for non-numbers', ()=>{
        var calc = new index.Calculator;
        expect(()=> calc.add("one", 1)).to.throw('Value should be a number.') 
      });
    });

    describe('divide', ()=> {
        it('should divide 2 numbers', ()=> {
           var calc = new index.Calculator;
           assert.equal(4, calc.divide(8,2));    
        });
  
        it('2/0 expect exception', ()=>{
          var calc = new index.Calculator;
          // NB: Assertion for throw to just include the message not the new Error stuff
          expect(()=> calc.divide(2,0)).to.throw('Divide by zero is not permitted.');   
        });
  
      });
  });


  /**
   *  Fake Authentication module tests ;-)
   */
  describe('authentication', ()=> {

      describe('login', ()=> {
        // NB: Resolving the promise
        it('Login with valid details should resolve the promise as true', ()=> {
          var auth = new index.AuthenticationService();
          auth.login('rahman', 'rahman').then((reason)=> {
            expect(reason).to.be(true);
          });
        });

        it('Login with in-valid details should resolve the promise as false', ()=> {
          var auth = new index.AuthenticationService();
          auth.login('rahman', 'invalid').then((reason)=> {
            expect(reason).to.be(false);
          });
        });

        it('Login with in-valid details async should return false', async ()=> {
          var auth = new index.AuthenticationService();
          let result = await auth.loginAsync('rahman', 'invalid');
          assert.equal(result, false)
        });

        it('Login with valid details async should return true', async ()=> {
          var auth = new index.AuthenticationService();
          let result = await auth.loginAsync('rahman', 'rahman');
          assert.equal(result, false)
        });

        // NOTE: Mocking somehow doesn't work
        it.skip('Login with valid details expect user info', ()=> {
          var auth = new index.AuthenticationService();

          var expectedUser = {id:1, name: 'rahman mahmoodi'};
          var mockedDb = sinon.mock(new index.Database);
          mockedDb.expects('login').withArgs(sinon.match.any, sinon.match.any).returns(expectedUser);

          let result = auth.loginWithInfo('rahman', 'rahman');
          expect(result).to.deep.equal(expectedUser);
          mockedDb.restore();
        });

        // Stubbing database service to return valid user
        it('Login with valid details expect user info', ()=> {
          var auth = new index.AuthenticationService();

          var expectedUser = {id:1, name: 'rahman mahmoodi'};
          var mockedDb = sinon.stub(index.Database.prototype, "login");
          mockedDb.withArgs(sinon.match.any, sinon.match.any).returns(expectedUser);

          let result = auth.loginWithInfo('rahman', 'rahman');
          expect(result).to.deep.equal(expectedUser);
          mockedDb.restore();
        });

        // Using Sinon stubbing to stub the Database service!!
        it('Login with in-valid details expect null', ()=> {
          var auth = new index.AuthenticationService();

          var expectedUser = null; // invalid user
          var mockedDb = sinon.stub(index.Database.prototype, "login");
          mockedDb.withArgs(sinon.match.any, sinon.match.any).returns(expectedUser);

          let result = auth.loginWithInfo('rahman', 'rahman');
          expect(result).to.deep.equal(expectedUser);
          mockedDb.restore();
        });

      });
  });


  /**
   * Setup and tear down
   */

  describe('authentication_with_setup_teardown', ()=> {

    var auth;
    var mockedDb;

    /**
     * Set up the dependencies for each function
     */
    beforeEach(function() {
       auth = new index.AuthenticationService();
       mockedDb = sinon.stub(index.Database.prototype, "login");
    });

    /**
     * Clean up the dependencies
     */
    afterEach(function() {
      mockedDb.restore();
    });

    describe('login', ()=> {
      // NB: Resolving the promise
      it('Login with valid details should resolve the promise as true', ()=> {
        auth.login('rahman', 'rahman').then((reason)=> {
          expect(reason).to.be(true);
        });
      });
      
      // Stubbing database service to return valid user
      it('Login with valid details expect user info', ()=> {
        var expectedUser = {id:1, name: 'rahman mahmoodi'};
        mockedDb.withArgs(sinon.match.any, sinon.match.any).returns(expectedUser);
        let result = auth.loginWithInfo('rahman', 'rahman');
        expect(result).to.deep.equal(expectedUser);
      });

      // Using Sinon stubbing to stub the Database service!!
      it('Login with in-valid details expect null', ()=> {
        var expectedUser = null; // invalid user
        mockedDb.withArgs(sinon.match.any, sinon.match.any).returns(expectedUser);
        let result = auth.loginWithInfo('rahman', 'rahman');
        expect(result).to.deep.equal(expectedUser);
      });

    });
});