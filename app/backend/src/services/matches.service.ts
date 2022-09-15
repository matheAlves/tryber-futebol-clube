import MatchModel from '../database/models/match.model';
import TeamModel from '../database/models/team.model';
import { Match } from '../interfaces';

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

  static async add(match: Match): Promise<Match> {
    const queryResult = await MatchModel.create({ ...match, inProgress: 1 });
    return queryResult;
  }
}
