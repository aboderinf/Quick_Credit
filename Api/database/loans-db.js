// import bcrypt from 'bcryptjs';
import db from './connect';

export default {
  findLoan: id => db.query({
    text: 'SELECT * FROM loans WHERE id = $1 LIMIT 1;',
    values: [id],
  }),
  createLoan: (
    amount,
    tenor,
    interest,
    user,
  ) => db.query({
    text: 'INSERT INTO loans(amount, tenor, balance, interest, paymentInstallment, createdOn, userEmail) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    values: [amount, tenor, (amount + interest), interest, (amount + interest) / tenor, new Date(), user],
  }),
  getAll: () => db.query('SELECT * FROM loans;')
};