import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';
import validateToken from '../middlewares/token-validation';

const matchesRoute = Router();

matchesRoute.get('/', MatchesController.list);
matchesRoute.post('/', validateToken, MatchesController.add);

export default matchesRoute;
