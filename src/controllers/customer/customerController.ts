import { Request, Response } from 'express';
import { ICustomerDTO } from '.';
import { awilixContainer } from '../../awilixSetup';
import { IResponseDTO } from '../../models/request';
import { ICustomerManager } from '../../services/customer';

const service: ICustomerManager = awilixContainer.resolve('customerManager');
export async function getCustomers(req: Request, res: Response): IResponseDTO<ICustomerDTO[]> {
  return res.send(await service.getAll());
}

export async function newCustomer(
  req: Request<any, any, ICustomerDTO, any>,
  res: Response
): IResponseDTO<{ success: string; data: ICustomerDTO }> {
  try {
    const response = await service.create(req.body);
    const mapping: ICustomerDTO = {
      id: response.id,
      custName: response.cust_name,
      address1: response.address1,
      address2: response.address2,
      province: response.province,
      district: response.district,
      zipCode: response.zip_code,
    };
    return res.send({ success: 'Create customer success', data: mapping });
  } catch (err) {
    return res.send({ error: err.message });
  }
}

export async function deleteCustomer(
  req: Request<any, any, ICustomerDTO, any>,
  res: Response
): IResponseDTO<{ success: string; data: ICustomerDTO }> {
  try {
    await service.delete(req.body.id);
    return res.send({ success: 'Delete customer success' });
  } catch (err) {
    return res.send({ error: err.message });
  }
}
