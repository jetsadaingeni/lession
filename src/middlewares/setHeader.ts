import { NextFunction, Request, Response } from 'express';
export const SetIp = (req: Request, res: Response, next: NextFunction) => {
  req.headers.ip = req.headers['x-forwarded-for'] || req.ip;
  next();
};
