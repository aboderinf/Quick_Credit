// Manage Table creation
import db from './connect';
import loanModel from './loans-db';
import userModel from './users-db';
import dotenv from 'dotenv';

dotenv.config();

const seed = [
  loanModel.createLoan({
    "amount": 1608000, 
    "tenor": 3, 
    "user" : "guest@gmail.com"
  }),
  loanModel.createLoan({
    "amount": 1500000, 
    "tenor": 6, 
    "user" : "moneyman@gmail.com"
  }),
  loanModel.createLoan({
    "amount": 1000000, 
    "tenor": 12, 
    "user" : "grady@gmail.com"
  })
]
db.query(`

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    status VARCHAR(255) DEFAULT 'unverified',
    isAdmin BOOLEAN DEFAULT false,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
CREATE TABLE IF NOT EXISTS loans (
    id SERIAL PRIMARY KEY,
    userEmail VARCHAR(255) NOT NULL,
    createdOn TIMESTAMP NOT NULL,
    status VARCHAR(255) DEFAULT 'pending',
    repaid BOOLEAN DEFAULT false,
    tenor INTEGER NOT NULL,
    amount FLOAT(2) NOT NULL,
    paymentInstallment FLOAT(2) NOT NULL,
    balance FLOAT(2) NOT NULL,
    interest FLOAT(2) NOT NULL
);`)
.then (() => (seed.forEach((element) => {return element} )))
.then((res) => {
    console.log('tables created');
})
  .catch((error) => {
    console.log(error);
    db.end();
  });
 
