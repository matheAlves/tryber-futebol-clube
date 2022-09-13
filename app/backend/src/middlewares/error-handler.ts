import { NextFunction, Request, Response } from 'express';

const errors: Record<string, number> = {
  missingCredentials: 400,
  invalidCredentials: 401,
};

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const status = errors[err.name];
  if (!status) return res.sendStatus(500);
  res.status(status).json({ message: err.message });
};

export default errorHandler;
