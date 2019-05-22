import db from './connect';

export default {
  getRepayment: (loanId) => db.query({
    text: 'SELECT * FROM repayments WHERE loanId = $1',
    values: [loanId],
  }),
  updateRepaid: (loanId) => db.query({
    text: 'UPDATE loans SET repaid = $2 WHERE id = $1 RETURNING *',
    values: [loanId, true],
  }),
  updateBalance: (loanId, balance) => db.query({
    text: 'UPDATE loans SET balance = $2 WHERE id = $1 RETURNING *',
    values: [loanId, balance],
  }),
  createRepayment: (
    loanId,
    amount,
    paidAmount,
    balance
  ) => db.query({
    text: 'INSERT INTO repayments(createdOn, loanId, amount, paidAmount, balance) VALUES($1, $2, $3, $4, $5) RETURNING *',
    values: [new Date(), loanId, amount, paidAmount, balance],
  }),
}