import loanModel from '../database/loans-db';
import userModel from '../database/users-db';
import repaymentModel from '../database/repayments-db';

export default class Check {
  static canCreateLoan(req, res, next) {
    const { user } = req.body;

    // Check if user is verified
    userModel.findByEmail(user)
      .then((result) => {
        const user = result.rows[0];
        if (user.status !== 'verified') {
          return res.status(400).json({
            status: 400,
            error: 'BAD REQUEST',
            message: 'Please ensure you have updated your account with your work or home address',
          });
        }
      });
    loanModel.findByEmail(user)
      .then((result) => {
        const loan = result.rows[0];
        // Check if user has a pending loan application
        if (loan.status === 'pending') {
          return res.status(400).json({
            status: 400,
            error: 'BAD REQUEST',
            message: 'You have a pending loan application',
          });
        }
        // Check if user has an existing loan that is not fully repaid
        if (loan.status === 'approved' && loan.repaid === false) {
          return res.status(400).json({
            status: 400,
            error: 'BAD REQUEST',
            message: 'You have a current loan that is not fully repaid',
          });
        }

        next();
      });
  }

  static canCreateUser(req, res, next) {
    const { email } = req.body;
    // Check if user already exists
    userModel.findByEmail(email)
      .then((result) => {
        const user = result.rows[0];
        if (user) {
          return res.status(409).json({
            status: 409,
            error: 'CONFLICT EXISTS',
            message: 'user email already exists',
          });
        }
        next();
      });
  }

  static canCreateRepayment(req, res, next) {
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
        const { balance, repaid } = loan;
        const { paidAmount } = req.body;
        if (repaid) {
          return res.status(400).json({
            status: 400,
            error: 'BAD REQUEST',
            message: 'loan is fully repaid',
          });
        }
        const newBalance = balance - paidAmount;
        if (newBalance < 0) {
          return res.status(400).json({
            status: 400,
            error: 'BAD REQUEST',
            message: `Repayment Amount is above owed amount. Balance left is ${balance}`,
          });
        }

        next();
      });
  }
}
