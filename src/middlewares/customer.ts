import { NextFunction, Request, Response } from 'express';
import { ICustomerDTO } from '../controllers/customer';
export const checkReqCustomerBody = async (
  req: Request<any, any, ICustomerDTO, any>,
  res: Response,
  next: NextFunction
) => {
  if (!req.body) {
    return res.send({ error: 'Request body is empty' });
  }
  const keys = ['custName', 'address1', 'address2', 'province', 'district', 'zipCode'];
  for await (const key of keys) {
    if (req.body[key] === undefined) {
      return res.status(404).send({ error: `${key} is undefined` });
    }
  }
  next();
};
