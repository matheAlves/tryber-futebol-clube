import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  static async list(_req: Request, res: Response) {
    const matches = await MatchesService.list();
    res.status(200).json(matches);
  }

  static async add(req: Request, res: Response) {
    await MatchesService.teamsValidation(req.body);
    const response = await MatchesService.add(req.body);
    res.status(201).json(response);
  }

  static async finalWhistle(req: Request, res: Response) {
    await MatchesService.blowFinalWhistle(Number(req.params.id));
    res.status(200).json({ message: 'Finished' });
  }

  static async updateScore(req: Request, res: Response) {
    await MatchesService.updateScore(Number(req.params.id), req.body);
    res.status(200).json({ ok: 'ok ' });
  }
}
