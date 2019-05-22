// Import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './server';
// Configure chai
chai.use(chaiHttp);
chai.should();

describe('User', () => {
  // Mock valid new user
  const new_user = {
    firstName: 'Juan',
    lastName: 'Lopez',
    email: 'juanl@gmail.com',
    password: 'password',
    address: 'New York',
  };
  // Mock valid login
  const user = {
    firstName: 'Juan',
    lastName: 'Lopez',
    email: 'juanlopez@gmail.com',
    password: 'password',
    address: 'New York',
  };
  // Mock invalid new user
  const bad_user = {
    firstName: 'Juan',
    lastName: 'Lopez',
    email: 'juanlopez@gmail',
    password: '',
    address: 'New York',
  };
  describe('POST/auth/signup', () => {
    it('should signup a new user and return 201', (done) => {

      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(new_user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.data.should.be.a('object');
          res.body.message.should.equal('Your account has sucessfully been created!');
          done();
        });
    });

    it('should not signup a invalid new user and return 400', (done) => {

      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(bad_user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.error.should.be.a('array');
          done();
        });
    });
  });

  describe('POST /auth/signin', () => {
    it('should log in a user', (done) => {
      chai.request(app).post('/api/v1/auth/signin')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a('object');
          res.body.message.should.equal('Login successful');
          done();
        });
    });

    it('should not log in an invalid user', (done) => {
      chai.request(app).post('/api/v1/auth/signin')
        .send(bad_user)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.message.should.equal('incorrect email or password');
          done();
        });
    });
  });

  describe('PATCH /users/:useremail/verify', () => {
    it('should update user status to verified', (done) => {
      chai.request(app).patch('/api/v1/users/juanlopez@gmail.com/verify').send({ status: 'verified' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.equal('user status has been updated to verified');
          res.body.should.be.a('object');
          res.body.data.should.be.a('object');
          res.body.data.status.should.equal('verified');
          done();
        });
    });
    it('should not update invalid user status to verified and return status code 404', (done) => {
      chai.request(app).patch('/api/v1/users/nobody@gmail.com/verify').send({ status: 'verified' })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.message.should.equal('user record not found');
          res.body.should.be.a('object');
          done();
        });
    });
  });

});

describe('Loans', () => {
  // Test to get all loans
  describe('GET /loans', () => {
    // Test to get all loans record
    it('should get all loans record', (done) => {
      chai.request(app)
        .get('/api/v1/loans')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a('array');
          done();
        });
    });
  });
  // Test to get all repaid loans
  describe('GET /loans?status=approved&repaid=true', () => {
    it('It should get all repaid loans', (done) => {
      chai.request(app).get('/api/v1/loans?status=approved&repaid=true')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.should.be.a('array');
          res.body.message.should.equal('All fully repaid loans');
          done();
        });
    });
  });
  // Test to get all current unrepaid loans
  describe('GET /loans?status=approved&repaid=false', () => {
    it('It should get all current loans that are not fully repaid', (done) => {
      chai.request(app).get('/api/v1/loans?status=approved&repaid=false')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.should.be.a('array');
          res.body.message.should.equal('All current loans not fully repaid');
          done();
        });
    });
  });
  // Test to get single loan record
  describe('GET /loans/:loan-id', () => {
    it('should get a single loan record', (done) => {
      const loanId = 1;
      chai.request(app)
        .get(`/api/v1/loans/${loanId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a('object');
          done();
        });
    });

    // Test to not get single loan record
    it('should not get a single loan record and return status 404', (done) => {
      const loanId = 1000;
      chai.request(app)
        .get(`/api/v1/loans/${loanId}`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
  // Test to create a loan application
  describe('POST /loans', () => {
    const new_loan = {
      user: 'aboderinf@gmail.com',
      tenor: 11,
      amount: 1000000,
    };
    const bad_loan = {
      user: 'juanlopez@gmail.com',
      tenor: 11,
    };
    const bad_loan2 = {
      user: 'unverified@gmail.com',
      tenor: 11,
      amount: 1000000,
    };
    const bad_loan3 = {
      user: 'user3@gmail.com',
      tenor: 11,
      amount: 1000000,
    };
    const bad_loan4 = {
      user: 'user4@gmail.com',
      tenor: 11,
      amount: 1000000,
    };
    it('should create a loan application', (done) => {
      chai.request(app).post('/api/v1/loans').send(new_loan)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.data.should.be.a('object');
          res.body.data.balance.should.equal(1050000);
          res.body.message.should.equal('Your loan application has sucessfully been created!');
          done();
        });
    });

    it('should not create a loan application, have a status of 400 and send error message', (done) => {
      chai.request(app).post('/api/v1/loans').send(bad_loan)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.error.should.be.a('array');
          done();
        });
    });

    it('should not create a loan application, have a status of 400 and send unverified user error message', (done) => {
      chai.request(app).post('/api/v1/loans').send(bad_loan2)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.message.should.equal('Please ensure you have updated your account with your work or home address');
          done();
        });
    });

    it('should not create a loan application, have a status of 400 and send pending loan error message', (done) => {
      chai.request(app).post('/api/v1/loans').send(bad_loan3)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.message.should.equal('You have a pending loan application');
          done();
        });
    });

    it('should not create a loan application, have a status of 400 and send unrepaid loan error message', (done) => {
      chai.request(app).post('/api/v1/loans').send(bad_loan4)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.message.should.equal('You have a current loan that is not fully repaid');
          done();
        });
    });

  });
  // Test to approve/reject loan application
  describe('/PATCH/loans/:loanId', () => {
    const loanId = 1;
    const badId = 200;
    const status1 = { status: 'approved' };
    const status2 = { status: 'rejected' };
    // Test to update loan status to approved
    it('should update the status of the loan to approved', (done) => {
      chai.request(app).patch(`/api/v1/loans/${loanId}`)
        .send(status1)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a('object');
          // res.body.data.status.should.equal("approved");
          res.body.message.should.equal('loan has been approved');
          done();
        });
    });
    // Test to update loan status to rejected
    it('should update the status of the loan to rejected', (done) => {
      chai.request(app).patch(`/api/v1/loans/${loanId}`)
        .send(status2)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a('object');
          // res.body.data.status.should.equal("rejected");
          res.body.message.should.equal('loan has been rejected');
          done();
        });
    });
    // Test should not update status
    it('should not update the status of the loan and return status 404', (done) => {
      chai.request(app).patch(`/api/v1/loans/${badId}`).send(status1)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.message.should.equal('loan record not found');
          done();
        });
    });

  });
  // Test to post repayment
  describe('POST /loans/:loanId/repayment', () => {
    const loanId = 1;
    const badloanId = 200;
    const repayment = {
      paidAmount: 210000,
    };
    const badRepayment = {
      paidAmount: 'abc',
    };
    // Test to post valid repayment
    it('should create a loan repayment record', (done) => {
      chai.request(app).post(`/api/v1/loans/${loanId}/repayment`).send(repayment)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.data.should.be.a('object');
          res.body.data.balance.should.equal(2100000 - repayment.paidAmount);
          res.body.message.should.equal(`loan repayment record for loan Id ${loanId} has sucessfully been created!`);
          done();
        });
    });
    // Test for invalid repayments
    it('should not create a loan repayment record and return status 404', (done) => {
      chai.request(app).post(`/api/v1/loans/${badloanId}/repayment`).send(repayment)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.message.should.equal('loan record not found');
          done();
        });
    });

    it('should not create a loan repayment record and return status 400', (done) => {
      chai.request(app).post(`/api/v1/loans/${badloanId}/repayment`).send(badRepayment)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.error.should.be.a('array');
          done();
        });
    });
  });
  // Test to get loan repayment history
  describe('GET /loans/:id/repayments', () => {

    it('should get loan repayment history', (done) => {
      const loanId = 1;
      chai.request(app).get(`/api/v1/loans/${loanId}/repayments`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a('object');
          res.body.message.should.equal('loan repayment history');
          done();
        });
    });

    // Test to get loan repayment history: Loan Repayment not found
    it('should not get loan repayment history', (done) => {
      const loanId = 70;
      chai.request(app).get(`/api/v1/loans/${loanId}/repayments`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.message.should.equal('loan repayment history not found');
          done();
        });
    });
  });
});

