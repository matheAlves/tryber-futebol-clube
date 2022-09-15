import { Request, Response } from 'express';
import TeamModel from '../database/models/team.model';

export default class TeamsController {
  static async list(req: Request, res: Response) {
    const list = await TeamModel.findAll();
    res.status(200).json(list);
  }
}
