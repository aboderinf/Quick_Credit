import loanModel from '../database/loans-db';
import users from '../models/users';
import repayments from '../models/repayments';

class loanController {
  static getAllLoans(req, res) {
    // Get all Loans
    loanModel.findLoan(2).then((result) => {
        const loans = result.rows[0]
    if (Object.keys(req.query).length === 0) {
      return res.status(200).json({
        status: 200,
        data: loans,
        message: 'All the loans',
      });
    }
}).catch( error => res.status(401).json({
    status: 401,
    error: 'Incorrect login details',
  })); 
    // const queryFinder = () => {return loans.filter(loan => loan.status === req.query.status && loan.repaid.toString() === req.query.repaid)};

    // // Get all repaid loans
    // const repaidLoans = queryFinder(); 
    // if (req.query.status === 'approved' && req.query.repaid === 'true') {
    //   return res.status(200).json({
    //     status: 200,
    //     data: repaidLoans,
    //     message: 'All fully repaid loans',
    //   });
    // }
    // // Get all current loans not fully repaid
    // const unrepaidLoans = queryFinder();
    // if (req.query.status === 'approved' && req.query.repaid === 'false') {
    //   return res.status(200).json({
    //     status: 200,
    //     data: unrepaidLoans,
    //     message: 'All current loans not fully repaid',
    //   });
    // }
  }

//   // Get a single Loan
//   static getSingleLoan(req, res) {
//     const findLoan = loans.find(loan => loan.id === parseInt(req.params.loanId, 10));
//     if (findLoan) {
//       return res.status(200).json({
//         status: 200,
//         data: findLoan,
//         message: 'A single loan record',
//       });
//     }
//     return res.status(404).json({
//       status: 404,
//       error: 'NOT FOUND',
//       message: 'loan record not found',
//     });
//   }
//  // Get Loan repayment history
 
}

export default loanController;
