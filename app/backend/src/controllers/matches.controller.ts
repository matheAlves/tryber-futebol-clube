import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  static async list(_req: Request, res: Response) {
    const matches = await MatchesService.list();
    res.status(200).json(matches);
  }

  static async add(req: Request, res: Response) {
    const response = await MatchesService.add(req.body);
    res.status(201).json(response);
  }
}
