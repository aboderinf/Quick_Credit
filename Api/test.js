// Import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './server';
// Configure chai
chai.use(chaiHttp);
chai.should();

describe('User', () => {
  //Mock valid new user
  const new_user = {
    firstName: "Juan",
    lastName: "Lopez",
    email: "juan@gmail.com",
    password: "password",
    address: "New York"
  }
  //Mock invalid new user
  const bad_user = {
    firstName: "Juan",
    lastName: "Lopez",
    email: "juanlopez@gmail",
    password: "",
    address: "New York"
  }
  describe('POST/auth/signup', () => {
    it('should signup a new user and return 201', (done) => {
      
      chai.request(app)
      .post('/auth/signup')
      .send(new_user)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.data.should.be.a('object')
        res.body.message.should.equal("Your account has sucessfully been created!");
        done();
      })
    });

    it('should not signup a invalid new user and return 400', (done) => {
      
      chai.request(app)
      .post('/auth/signup')
      .send(bad_user)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.error.should.be.a('array')
        done();
      })
    });

});

})

