import { Router } from 'express';
import userController from '../controllers/newuserController';
import loanController from '../controllers/newloanController';
import RepaymentController from '../controllers/repaymentController';
import Validation from '../middlewares/validation';

const routes = Router();
routes.post('/auth/signup', Validation.userValidator, userController.createUser);
routes.post('/auth/signin', userController.userLogin);
routes.patch('/users/:useremail/verify', userController.verifyUser);
routes.get('/loans', loanController.getAllLoans);
routes.get('/loans/:loanId', loanController.getSingleLoan);
routes.post('/loans', loanController.createLoan);
routes.patch('/loans/:loanId', loanController.updateloanStatus);
routes.post('/loans/:loanId/repayment', Validation.repaymentValidator, RepaymentController.createRepayment);
routes.get('/loans/:loanId/repayments', RepaymentController.getRepayment);
export default routes;
