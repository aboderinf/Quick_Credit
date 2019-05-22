import loans from '../models/loans';
import users from '../models/users';
import repayments from '../models/repayments';

class LoanController {
  static getAllLoans(req, res) {
    // Get all Loans
    if (Object.keys(req.query).length === 0) {
      return res.status(200).json({
        status: 200,
        data: loans,
        message: 'All the loans',
      });
    }
    const queryFinder = () => loans.filter(loan => loan.status === req.query.status && loan.repaid.toString() === req.query.repaid);

    // Get all repaid loans
    const repaidLoans = queryFinder();
    if (req.query.status === 'approved' && req.query.repaid === 'true') {
      return res.status(200).json({
        status: 200,
        data: repaidLoans,
        message: 'All fully repaid loans',
      });
    }
    // Get all current loans not fully repaid
    const unrepaidLoans = queryFinder();
    if (req.query.status === 'approved' && req.query.repaid === 'false') {
      return res.status(200).json({
        status: 200,
        data: unrepaidLoans,
        message: 'All current loans not fully repaid',
      });
    }
  }

  // Get a single Loan
  static getSingleLoan(req, res) {
    const findLoan = loans.find(loan => loan.id === parseInt(req.params.loanId, 10));
    if (findLoan) {
      return res.status(200).json({
        status: 200,
        data: findLoan,
        message: 'A single loan record',
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'NOT FOUND',
      message: 'loan record not found',
    });
  }

  // User can apply for loan
  static createLoan(req, res) {
    // Check if user is verified
    const user = users.find(user1 => req.body.user === user1.email);
    if (user.status !== 'verified') {
      return res.status(400).json({
        status: 400,
        error: 'BAD REQUEST',
        message: 'Please ensure you have updated your account with your work or home address',
      });
    }
    // Check if user has a pending loan application
    const checkLoan = loans.find(loan => req.body.user === loan.user);
    if (checkLoan) {
      if (checkLoan.status === 'pending') {
        return res.status(400).json({
          status: 400,
          error: 'BAD REQUEST',
          message: 'You have a pending loan application',
        });
      }
      // Check if user has an existing loan that is not fully repaid
      if (checkLoan.status === 'approved' && checkLoan.repaid === false) {
        return res.status(400).json({
          status: 400,
          error: 'BAD REQUEST',
          message: 'You have a current loan that is not fully repaid',
        });
      }
    }

    const newLoan = {
      id: loans.length + 1,
      user: req.body.user,
      createdOn: new Date(),
      status: 'pending',
      repaid: false,
      tenor: req.body.tenor,
      amount: req.body.amount,
      paymentInstallment: (1.05 * req.body.amount) / req.body.tenor,
      balance: 1.05 * req.body.amount,
      interest: 0.05 * req.body.amount,
    };
    loans.push(newLoan);
    return res.status(201).json({
      status: 201,
      data: newLoan,
      message: 'Your loan application has sucessfully been created!',
    });
  }

  // Approve or reject loan application
  static updateloanStatus(req, res) {
    const findLoan = loans.find(loan => loan.id === parseInt(req.params.loanId, 10));
    if (findLoan) {
      findLoan.status = req.body.status;
      return res.status(200).json({
        status: 200,
        data: findLoan,
        message: `loan has been ${req.body.status}`,
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'NOT FOUND',
      message: 'loan record not found',
    });
  }

  // Create loan repayment record
  static createRepayment(req, res) {
    const findLoan = loans.find(loan => loan.id === parseInt(req.params.loanId, 10));
    if (findLoan) {
      const repayment = {
        id: repayments.length + 1,
        createdOn: new Date(),
        loanId: req.params.loanId,
        monthlyInstallment: findLoan.paymentInstallment, // what the user is expected to pay
        amount: findLoan.amount,
        paidAmount: req.body.paidAmount,
        balance: findLoan.balance - req.body.paidAmount,
      };

      repayments.push(repayment);
      return res.status(201).json({
        status: 201,
        data: repayment,
        message: `loan repayment record for loan Id ${req.params.loanId} has sucessfully been created!`,
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'NOT FOUND',
      message: 'loan record not found',
    });
  }

  // Get Loan repayment history
  static getRepaymentHistory(req, res) {
    const findRepayment = repayments.find(repayment => repayment.loanId === parseInt(req.params.loanId, 10));
    if (findRepayment) {
      return res.status(200).json({
        status: 200,
        data: findRepayment,
        message: 'loan repayment history',
      });
    }
    return res.status(404).json({
      status: 404,
      message: 'loan repayment history not found',
    });
  }
}

export default LoanController;
