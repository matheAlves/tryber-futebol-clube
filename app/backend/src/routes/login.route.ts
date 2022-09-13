import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import validateToken from '../middlewares/token-validation';

const loginRoute = Router();

loginRoute.post('/', LoginController.login);
loginRoute.get('/validate', validateToken, LoginController.validate);

export default loginRoute;
