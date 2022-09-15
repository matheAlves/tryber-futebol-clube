import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';
import validateToken from '../middlewares/token-validation';

const matchesRoute = Router();

matchesRoute.get('/', MatchesController.list);
matchesRoute.post('/', validateToken, MatchesController.add);
matchesRoute.patch('/:id', MatchesController.updateScore);
matchesRoute.patch('/:id/finish', MatchesController.finalWhistle);

export default matchesRoute;
