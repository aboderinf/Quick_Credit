import { Router } from 'express';
import UserController from '../controllers/userController';
import Validation from '../middlewares/validation'

const routes = Router();
routes.post('/auth/signup', Validation.userValidator, UserController.createUser);
routes.post('/auth/signin', UserController.userLogin);
routes.patch('/users/:useremail/verify', UserController.verifyUser);

export default routes;

