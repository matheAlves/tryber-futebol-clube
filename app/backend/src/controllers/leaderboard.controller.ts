import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';
import TeamsService from '../services/teams.service';
import MatchesService from '../services/matches.service';
import { Match } from '../interfaces/index';

export default class LeaderboardController {
  static async getHomeTable(req: Request, res: Response) {
    const teams = await TeamsService.list();
    const allMatches = await MatchesService.list();
    const finishedMatches = allMatches.filter((match: Match) => match.inProgress === false);
    const homeMatchesStats = await LeaderboardService.homeMatchesStats(teams, finishedMatches);
    const addPtsAndEfficiency = await LeaderboardService.calcPoints(homeMatchesStats);
    const orderedTable = await LeaderboardService.order(addPtsAndEfficiency);

    res.status(200).json(orderedTable);
  }
}
