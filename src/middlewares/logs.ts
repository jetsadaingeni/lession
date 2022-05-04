import { NextFunction, Request, Response } from 'express';
import moment from 'moment';
export default function RequestLogs(req: Request, res: Response, next: NextFunction) {
  const now = moment().format('DD/MM/YYYY HH:mm:ss');
  console.log(now, { originalUrl: req.originalUrl, from: req.headers.ip, body: req.body });
  next();
}
