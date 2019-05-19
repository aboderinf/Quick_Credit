import { Router } from 'express';
import userController from '../controllers/newuserController';
import LoanController from '../controllers/loanController';
import Validation from '../middlewares/validation'

const routes = Router();
routes.post('/auth/signup', Validation.userValidator, userController.createUser);
routes.post('/auth/signin', userController.userLogin);
routes.patch('/users/:useremail/verify', userController.verifyUser);
routes.get('/loans', LoanController.getAllLoans);
routes.get('/loans/:loanId', LoanController.getSingleLoan);
routes.post('/loans', Validation.loanValidator, LoanController.createLoan);
routes.patch('/loans/:loanId', LoanController.updateloanStatus);
routes.post('/loans/:loanId/repayment', Validation.repaymentValidator, LoanController.createRepayment);
routes.get('/loans/:loanId/repayments', LoanController.getRepaymentHistory);
export default routes;

