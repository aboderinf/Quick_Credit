// import bcrypt from 'bcryptjs';
import client from './connect';

export default {
  findLoan: loanId => client.query({
    text: 'SELECT * FROM loans WHERE id = $1 LIMIT 1;',
    values: [loanId],
  }),
  createLoan: (
    amount,
    tenor,
    interest,
    user,
  ) => client.query({
    text: 'INSERT INTO loans(amount, tenor, balance, interest, paymentInstallment, createdOn, userEmail) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    values: [amount, tenor, (amount + interest), interest, (amount + interest) / tenor, new Date(), user],
  }),
  getAll: () => client.query({
    text: 'SELECT * FROM loans'
  })
};