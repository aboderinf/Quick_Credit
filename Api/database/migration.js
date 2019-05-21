// Manage Table creation
import db from './connect';
import loanModel from './loans-db';
import UserModel from './users-db';
import dotenv from 'dotenv';

dotenv.config();

let seed = [UserModel.create({
	"email": "aboderina@gmail.com",
    "firstName": "Feranmi",
    "lastName": "Aboderin",
    "password": "password",
    "address": "Chicago"
	
}), loanModel.createLoan(10000, 5, 4000, 'paraguay@gmail.com'),loanModel.createLoan(100000, 6, 5000, 'newuser@gmail.com'),loanModel.createLoan(100000, 6, 5000, 'pr@gmail.com')]
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
.then (seed.forEach((element) => {return element} ))
.then((res) => {
    console.log('tables created');
  db.end();
})
  .catch((error) => {
    console.log(error, '%%%%%');
    db.end();
  });
 
