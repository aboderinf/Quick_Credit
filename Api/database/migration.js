// Manage Table creation
import client from './connect';
import loanModel from './loans-db';

const seedLoan = () => {
  loanModel.createLoan(100000, 6, 5000, 'param@gmail.com');
  loanModel.createLoan(100000, 6, 5000,'germain@gmail.com');
  loanModel.createLoan(500000, 6, 25000,'lopez@gmail.com');
  }
client.query(`
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_status') THEN
    CREATE TYPE user_status AS ENUM ('verified', 'unverified');
    END IF;
END
$$;
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    status user_status DEFAULT 'unverified',
    isAdmin BOOLEAN DEFAULT false,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'loan_status') THEN
    CREATE TYPE loan_status AS ENUM ('pending', 'approved', 'rejected');
    END IF;
END
$$;
CREATE TABLE IF NOT EXISTS loans (
    id SERIAL PRIMARY KEY,
    userEmail VARCHAR(255) NOT NULL,
    createdOn TIMESTAMP NOT NULL,
    status loan_status DEFAULT 'pending',
    repaid BOOLEAN DEFAULT false,
    tenor INTEGER NOT NULL,
    amount FLOAT(2) NOT NULL,
    paymentInstallment FLOAT(2) NOT NULL,
    balance FLOAT(2) NOT NULL,
    interest FLOAT(2) NOT NULL
);

`)
.then (() => seedLoan())
.then((res) => {
    console.log('tables created');
  client.end();
})
  .catch((error) => {
    console.log(error);
    client.end();
  });