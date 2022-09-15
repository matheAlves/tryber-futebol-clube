import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';

const matchesRoute = Router();

matchesRoute.get('/', MatchesController.list);

export default matchesRoute;
