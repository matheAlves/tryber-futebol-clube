import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const leaderboardRoute = Router();

leaderboardRoute.get('/', LeaderboardController.getAllTable);
leaderboardRoute.get('/home', LeaderboardController.getHomeTable);
leaderboardRoute.get('/away', LeaderboardController.getAwayTable);

export default leaderboardRoute;
