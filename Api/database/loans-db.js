import db from './connect';

export default {
  findLoan: id => db.query({
    text: 'SELECT * FROM loans WHERE id = $1 LIMIT 1;',
    values: [id],
  }),
  createLoan: ({
    amount,
    tenor,
    user,
  }) => db.query({
    text: 'INSERT INTO loans(amount, tenor, balance, interest, paymentInstallment, createdOn, userEmail) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    values: [amount, tenor, (1.05 * amount), (0.05 * amount), (1.05 * amount) / tenor, new Date(), user],
  }),
  getAll: () => db.query('SELECT * FROM loans;'),
  updateloanStatus: (loanId, { status }) => db.query({
    text: 'UPDATE loans SET STATUS = $2 WHERE id = $1 RETURNING *',
    values: [loanId, status],
  }),
};
