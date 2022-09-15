import { Request, Response } from 'express';
import MatchModel from '../database/models/match.model';
import TeamModel from '../database/models/team.model';

export default class MatchesController {
  static async list(req: Request, res: Response) {
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
    res.status(200).json(list);
  }
}
