import loanModel from '../database/loans-db';
import users from '../models/users';
import repayments from '../models/repayments';

class loanController {
  static getAllLoans(req, res) {
    // Get all Loans
   loanModel.getAll() 
   .then(({ rows }) => {
    const data = [];
    rows.forEach(element => {data.push({...element})}
      )
    if (Object.keys(req.query).length === 0){
    return res.status(200).json({
      status: 200,
      data,
      message: 'All the loans',
    })
    }
    const queryFinder = () => {return data.filter(loan => loan.status === req.query.status && loan.repaid.toString() === req.query.repaid)};

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
  })
.catch( error => res.status(401).json({
    status: 401,
    error: error,
  }));   
  }

  // Get a single Loan
  static getSingleLoan(req, res) {
    const {loanId} = req.params;
    loanModel.findLoan(loanId)
    .then((result) => {
      const loan = result.rows[0];
      if (!loan) {
        return res.status(404).json({
          status: 404,
          error: 'NOT FOUND',
          message: 'loan record not found',
        })
      }
      return res.status(200).json({
        status: 200,
        data: loan,
        message: 'A single loan record',
      });
    })
  }
  // Create Loan application
  static createLoan(req, res) {
    console.log(req.body)
    
    loanModel.createLoan(req.body)
      .then(({ rows }) => {
        console.log(rows);
         return res.status(201).json({
          status: 201,
          data: {
            ...rows[0],
          },
          message: 'Your loan application has sucessfully been created!',
    })
   }).catch((error)=> console.log(error))
  }

// Get Loan repayment history

}

export default loanController;
