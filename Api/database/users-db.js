import bcrypt from 'bcryptjs';
import pool from './connect';

export default {
  create: ({
    firstName,
    lastName,
    address,
    email,
    password,
  }) => pool.query({
    text: 'INSERT INTO users(firstName, lastName, address, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    values: [firstName, lastName, address, email, bcrypt.hashSync(password, 10)],
  }),
  findByEmail: email => pool.query({
    text: 'SELECT * FROM users WHERE email = $1 LIMIT 1',
    values: [email],
  }),
};