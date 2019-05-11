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
  // Mock valid login
  const user = {
    firstName: "Juan",
    lastName: "Lopez",
    email: "juanlopez@gmail.com",
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

  describe('POST /auth/signin', () => {
    it('should log in a user', (done) => {
      chai.request(app).post('/auth/signin')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.data.should.be.a('object');
        res.body.message.should.equal("Login successful");
        done();
      })
    });
  
  it('should not log in an invalid user', (done) => {
    chai.request(app).post('/auth/signin')
    .send(bad_user)
    .end((err, res) => {
      res.should.have.status(401);
      res.body.message.should.equal("incorrect email or password");
      done();
    })
  });
  });
  
  describe('PATCH /users/:useremail/verify', () => {
    it('should update user status to verified', (done) => {
      chai.request(app).patch('/users/juanlopez@gmail.com/verify').send({status: "verified"})
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.equal('user status has been updated to verified');
        res.body.should.be.a('object');
        res.body.data.should.be.a('object');
        res.body.data.status.should.equal('verified');
        done()
      })
    });
    it('should not update invalid user status to verified and return status code 404', (done) => {
      chai.request(app).patch('/users/nobody@gmail.com/verify').send({status: "verified"})
      .end((err, res) => {
        res.should.have.status(404);
        res.body.message.should.equal('user record not found');
        res.body.should.be.a('object');
        done()
      })
    });
  });
  
});

describe('Loans', () => {
  describe('GET /loans', () => {
    // Test to get all loans record
    it('should get all loans record', (done) => {
      chai.request(app)
        .get('/loans')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a('array');
          done();
        });
    });
  });
});
