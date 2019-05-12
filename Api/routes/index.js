import { Router } from 'express';
import UserController from '../controllers/userController';
import LoanController from '../controllers/loanController';
import Validation from '../middlewares/validation'

const routes = Router();
routes.post('/auth/signup', Validation.userValidator, UserController.createUser);
routes.post('/auth/signin', UserController.userLogin);
routes.patch('/users/:useremail/verify', UserController.verifyUser);
routes.get('/loans', LoanController.getAllLoans);
routes.get('/loans/:loanId', LoanController.getSingleLoan);
routes.post('/loans', Validation.loanValidator, LoanController.createLoan);
routes.patch('/loans/:loanId', LoanController.updateloanStatus);
routes.post('/loans/:loanId/repayment', Validation.repaymentValidator, LoanController.createRepayment);
routes.get('/loans/:loanId/repayments', LoanController.getRepaymentHistory);
export default routes;

