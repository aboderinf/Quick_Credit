import { Router } from 'express';
import userController from '../controllers/newuserController';
import loanController from '../controllers/newloanController';
import RepaymentController from '../controllers/repaymentController';
import Validation from '../middlewares/validation';
import Check from '../middlewares/check';
import Token from '../middlewares/token';

const routes = Router();
routes.post('/auth/signup', Validation.userValidator, Check.canCreateUser, userController.createUser);
routes.post('/auth/signin', userController.userLogin);
routes.patch('/users/:useremail/verify', Token.checkAdmin, userController.verifyUser);
routes.get('/loans', Token.checkAdmin, loanController.getAllLoans);
routes.get('/loans/:loanId', Token.checkAdmin, loanController.getSingleLoan);
routes.post('/loans', Validation.loanValidator, Token.checkUser, Check.canCreateLoan, loanController.createLoan);
routes.patch('/loans/:loanId', Token.checkAdmin, loanController.updateloanStatus);
routes.post('/loans/:loanId/repayment', Token.checkAdmin, Validation.repaymentValidator, Check.canCreateRepayment, RepaymentController.createRepayment);
routes.get('/loans/:loanId/repayments', Token.checkUser, RepaymentController.getRepayment);
export default routes;
