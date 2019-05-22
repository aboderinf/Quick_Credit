// Create loan repayment record
import loanModel from '../database/loans-db';
import repaymentModel from '../database/repayments-db';

export default class RepaymentController {
  static createRepayment(req, res) {
    const { loanId } = req.params;
    let loan;
    loanModel.findLoan(loanId)
      .then((result) => {
        loan = result.rows[0];
        if (!loan) {
          return res.status(404).json({
            status: 404,
            error: 'NOT FOUND',
            message: 'loan record not found',
          });
        }
      })
      .then(() => {
        const { balance, repaid, amount } = loan;
        const { paidAmount } = req.body;
        if (repaid) {
          return res.status(400).json({
            status: 400,
            error: 'BAD REQUEST',
            message: 'loan is fully repaid',
          });
        }
        const newBalance = balance - paidAmount;
        repaymentModel.updateBalance(loanId, newBalance);
        if (newBalance < 0) {
          return res.status(400).json({
            status: 400,
            error: 'BAD REQUEST',
            message: `Repayment Amount is above owed amount. Balance left is ${balance}`,
          });
        }
        if (newBalance === 0) {
          repaymentModel.updateRepaid(loanId);
        }
        repaymentModel.createRepayment(loanId, amount, paidAmount, newBalance)
          .then(({ rows }) => res.status(201).json({
            status: 201,
            data: {
              ...rows[0],
            },
            message: `loan repayment record for loan Id ${req.params.loanId} has sucessfully been created!`,
          }));
      });
  }

  static getRepayment(req, res) {
    const { loanId } = req.params;
    repaymentModel.getRepayment(loanId)
      .then(({ rows }) => {
        const repayments = [];
        rows.forEach((element) => { repayments.push({ ...element }); });
        if (repayments) {
          return res.status(200).json({
            status: 200,
            data: repayments,
            message: 'loan repayment history',
          });
        }
        return res.status(404).json({
          status: 404,
          error: 'NOT FOUND',
          message: 'loan repayment history not found',
        });
      });
  }
}
