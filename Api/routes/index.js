import { Router } from 'express';
import UserController from '../controllers/userController';
import LoanController from '../controllers/loanController';
import Validation from '../middlewares/validation'

const routes = Router();
routes.post('/auth/signup', Validation.userValidator, UserController.createUser);
routes.post('/auth/signin', UserController.userLogin);
routes.patch('/users/:useremail/verify', UserController.verifyUser);
routes.get('/loans', LoanController.getAllLoans);
export default routes;

