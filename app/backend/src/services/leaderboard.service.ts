import { Match, TeamStats } from '../interfaces/index';
import TeamModel from '../database/models/team.model';

const template = {
  name: '',
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: 0,
};

export default class LeaderboardService {
  static async homeMatchesStats(teams: TeamModel[], matches: Match[]) {
    const calc = teams.map((team) => {
      const result = { ...team, ...template };
      matches.forEach((match) => {
        if (Number(match.homeTeam) === Number(team.id)) {
          result.totalGames += 1;
          result.goalsFavor += match.homeTeamGoals;
          result.goalsOwn += match.awayTeamGoals;
          if (match.homeTeamGoals > match.awayTeamGoals) result.totalVictories += 1;
          else if (match.homeTeamGoals < match.awayTeamGoals) result.totalLosses += 1;
          else result.totalDraws += 1;
        }
      });
      const { teamName, id, ...stats } = result;
      stats.name = teamName;
      return stats;
    });
    return calc;
  }

  static async calcPoints(teams: TeamStats[]) {
    const calc = teams.map((input) => {
      const output = { ...input };
      output.totalPoints = (input.totalVictories * 3) + input.totalDraws;
      output.goalsBalance = input.goalsFavor - input.goalsOwn;
      console.log(output);
      return output;
    });
    const result = await LeaderboardService.calcEfficiency(calc);
    return result;
  }

  static async calcEfficiency(teams: TeamStats[]) {
    const response = teams.map((input) => {
      const result = { ...input };
      const calc = ((input.totalPoints / (input.totalGames * 3)) * 100).toFixed(2);
      result.efficiency = Number(calc);
      return result;
    });
    return response;
  }

  static async order(teams: TeamStats[]) {
    const result = teams.sort((a, b) => {
      if (a.totalPoints === b.totalPoints) {
        if (a.goalsBalance === b.goalsBalance) {
          if (a.goalsFavor === b.goalsFavor) {
            return a.goalsOwn - b.goalsOwn;
          }
          return b.goalsFavor - a.goalsFavor;
        }
        return b.goalsBalance - a.goalsBalance;
      }
      return b.totalPoints - a.totalPoints;
    });
    return result;
  }
}
