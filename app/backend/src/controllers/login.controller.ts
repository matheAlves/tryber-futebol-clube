import { Request, Response } from 'express';
import AuthService from '../services/auth.service';
import UserService from '../services/user.service';

export default class LoginController {
  static async login(req: Request, res: Response) {
    if (!req.body.email || !req.body.password) {
      const e = new Error('All fields must be filled');
      e.name = 'missingCredentials';
      throw e;
    }
    // await AuthService.validateLoginReqBody(req.body);
    const hash = await UserService.checkEmailExists(req.body.email);
    await AuthService.checkPassword(req.body.password, hash);
    const token = await AuthService.generateToken(req.body.email);
    res.status(200).json({ token });
  }
}
