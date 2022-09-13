import { NextFunction, Request, Response } from 'express';
import AuthService from '../services/auth.service';

async function validateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;
  if (!token) {
    const err = new Error('Token not found');
    err.name = 'InvalidCredentials';
    throw err;
  }
  const user = await AuthService.readToken(token);
  res.locals.user = user;
  next();
}

export default validateToken;
