import { Router } from 'express';
import TeamsController from '../controllers/teams.controller';
// import validateToken from '../middlewares/token-validation';

const teamsRoute = Router();

teamsRoute.get('/', TeamsController.list);
teamsRoute.get('/:id', TeamsController.getById);

export default teamsRoute;
