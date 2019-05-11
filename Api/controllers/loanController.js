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
  }
}

export default LoanController;
