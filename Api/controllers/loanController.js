import loans from '../models/loans';
class LoanController {
  static getAllLoans(req, res) {
    // Get all Loans
    if (Object.keys(req.query).length == 0) {
      return res.status(200).json({
        status: 200,
        data: loans,
        message: 'All the loans',
      });
    }
    // Get all repaid loans
    const repaidLoans = loans.filter(loan => loan.status === req.query.status && loan.repaid.toString() === req.query.repaid);
    if (req.query.status == 'approved' && req.query.repaid == 'true') {
      return res.status(200).json({
        status: 200,
        data: repaidLoans,
        message: 'All fully repaid loans',
      });
    }
  }
}

export default LoanController;
