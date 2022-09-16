import MatchModel from '../database/models/match.model';
import TeamModel from '../database/models/team.model';
import TeamsService from './teams.service';
import { Match, Score } from '../interfaces';

export default class MatchesService {
  static async list(): Promise<Match[]> {
    const list = await MatchModel.findAll({
      include: [{
        model: TeamModel,
        as: 'teamHome',
        attributes: ['teamName'],
      },
      {
        model: TeamModel,
        as: 'teamAway',
        attributes: ['teamName'],
      }],
    });
    return list;
  }

  static async teamsValidation(match: Match) {
    const { homeTeam, awayTeam } = match;
    if (homeTeam === awayTeam) {
      const e = new Error('It is not possible to create a match with two equal teams');
      e.name = 'invalidCredentials';
      throw e;
    }
    const [home, away] = await Promise.all(
      [homeTeam, awayTeam].map((id) => TeamsService.getTeamById(id)),
    );
    if (!home || !away) {
      const e = new Error('There is no team with such id!');
      e.name = 'notFound';
      throw e;
    }
  }

  static async add(match: Match): Promise<Match> {
    const queryResult = await MatchModel.create({ ...match, inProgress: 1 });
    return queryResult;
  }

  static async updateScore(id: number, score: Score): Promise<void> {
    await MatchModel.update(score, {
      where: { id },
    });
  }

  static async blowFinalWhistle(id: number): Promise<void> {
    await MatchModel.update({ inProgress: 0 }, {
      where: { id },
    });
  }
}
