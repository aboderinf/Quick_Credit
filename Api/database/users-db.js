import bcrypt from 'bcryptjs';
import db from './connect';

export default {
  create: ({
    firstName,
    lastName,
    address,
    email,
    password,
  }) => db.query({
    text: 'INSERT INTO users(firstName, lastName, address, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    values: [firstName, lastName, address, email, bcrypt.hashSync(password, 10)],
  }),
  findByEmail: email => db.query({
    text: 'SELECT * FROM users WHERE email = $1 LIMIT 1',
    values: [email],
  }),
  verifyUser: email => db.query({
    // eslint-disable-next-line quotes
    text: `UPDATE users SET STATUS = 'verified' WHERE email = $1`,
    values: [email],
  }), 
};