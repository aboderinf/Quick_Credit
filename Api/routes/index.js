import { Router } from 'express';
import userController from '../controllers/newuserController';
import loanController from '../controllers/newloanController';
import LoanController from '../controllers/loanController';
import Validation from '../middlewares/validation';

const routes = Router();
routes.post('/auth/signup', Validation.userValidator, userController.createUser);
routes.post('/auth/signin', userController.userLogin);
routes.patch('/users/:useremail/verify', userController.verifyUser);
routes.get('/loans', loanController.getAllLoans);
routes.get('/loans/:loanId', loanController.getSingleLoan);
routes.post('/loans', loanController.createLoan);
routes.patch('/loans/:loanId', loanController.updateloanStatus);
routes.post('/loans/:loanId/repayment', Validation.repaymentValidator, LoanController.createRepayment);
routes.get('/loans/:loanId/repayments', LoanController.getRepaymentHistory);
export default routes;
