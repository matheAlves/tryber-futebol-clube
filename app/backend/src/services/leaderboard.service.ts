import { Match, TeamStats, statsTemplate } from '../interfaces/index';
import TeamModel from '../database/models/team.model';

export default class LeaderboardService {
  // static async calcAll(t: TeamModel, matches: Match[]) {
  //   const result = { ...t, ...statsTemplate };
  //   matches.forEach((m) => {
  //     if (Number(t.id) === Number(m.homeTeam)) {
  //       result.totalGames += 1;
  //       result.goalsFavor += m.homeTeamGoals;
  //       result.goalsOwn += m.awayTeamGoals;
  //       if (m.homeTeamGoals > m.awayTeamGoals) result.totalVictories += 1;
  //       else if (m.homeTeamGoals < m.awayTeamGoals) result.totalLosses += 1;
  //       else result.totalDraws += 1;
  //     } else if (Number(t.id) === Number(m.awayTeam)) {
  //       result.totalGames += 1;
  //       result.goalsFavor += m.awayTeamGoals;
  //       result.goalsOwn += m.homeTeamGoals;
  //       if (m.awayTeamGoals > m.homeTeamGoals) result.totalVictories += 1;
  //       else if (m.awayTeamGoals < m.homeTeamGoals) result.totalLosses += 1;
  //       else result.totalDraws += 1;
  //     }
  //   });
  //   const { teamName, id, ...stats } = result;
  //   stats.name = teamName;
  //   return stats;
  // }

  static async calc(currStat: TeamStats, match: Match) {
    const newStat = currStat;
    newStat.totalGames += 1;
    newStat.goalsFavor += match.homeTeamGoals;
    newStat.goalsOwn += match.awayTeamGoals;
    if (match.homeTeamGoals > match.awayTeamGoals) newStat.totalVictories += 1;
    else if (match.homeTeamGoals < match.awayTeamGoals) newStat.totalLosses += 1;
    else newStat.totalDraws += 1;
    return newStat;
  }

  static async sumHomeAway(home: TeamStats[], away: TeamStats[]): Promise<TeamStats[]> {
    const result = home;
    home.forEach((t1, index) => {
      away.forEach((t2) => {
        if (t1.name === t2.name) {
          const updated = t1;
          updated.totalGames += t2.totalGames;
          updated.totalVictories += t2.totalVictories;
          updated.totalDraws += t2.totalDraws;
          updated.totalLosses += t2.totalLosses;
          updated.goalsFavor += t2.goalsFavor;
          updated.goalsOwn += t2.goalsOwn;
          result[index] = updated;
        }
      });
    });
    return result as TeamStats[];
  }

  // static async allMatchesStats(teams: TeamModel[], matches: Match[]) {
  //   const calc = Promise.all(
  //     teams.map((t) => {
  //       const result = LeaderboardService.calcAll(t, matches);
  //       return result;
  //     }),
  //   );
  //   return calc;
  // }

  static async calcHome(team: TeamModel, matches: Match[]) {
    const result = { ...team, ...statsTemplate };
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
    return stats as TeamStats;
  }

  static async homeMatchesStats(teams: TeamModel[], matches: Match[]) {
    const calc = await Promise.all(
      teams.map((team) => {
        const result = LeaderboardService.calcHome(team, matches);
        return result;
      }),
    );
    return calc;
  }

  static async calcAway(team: TeamModel, matches: Match[]) {
    const result = { ...team, ...statsTemplate };
    matches.forEach((match) => {
      if (Number(match.awayTeam) === Number(team.id)) {
        result.totalGames += 1;
        result.goalsFavor += match.awayTeamGoals;
        result.goalsOwn += match.homeTeamGoals;
        if (match.awayTeamGoals > match.homeTeamGoals) result.totalVictories += 1;
        else if (match.awayTeamGoals < match.homeTeamGoals) result.totalLosses += 1;
        else result.totalDraws += 1;
      }
    });
    const { teamName, id, ...stats } = result;
    stats.name = teamName;
    return stats as TeamStats;
  }

  static async awayMatchesStats(teams: TeamModel[], matches: Match[]) {
    const calc = await Promise.all(
      teams.map((team) => {
        const result = LeaderboardService.calcAway(team, matches);
        return result;
      }),
    );
    return calc;
  }

  static async calcPoints(teams: TeamStats[]) {
    const calc = teams.map((input) => {
      const output = { ...input };
      output.totalPoints = (input.totalVictories * 3) + input.totalDraws;
      output.goalsBalance = input.goalsFavor - input.goalsOwn;
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

  static async orderTable(teams: TeamStats[]) {
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
