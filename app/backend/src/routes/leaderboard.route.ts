import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const leaderboardRoute = Router();

leaderboardRoute.get('/home', LeaderboardController.getHomeTable);

export default leaderboardRoute;
