import { ICustomerDTO } from '../../controllers/customer';
import { ICustomer } from '../../models/customer';

export interface ICustomerManager {
  getAll(): Promise<ICustomerDTO[]>;
  create(customer: ICustomerDTO): Promise<ICustomer>;
  delete(id: string): Promise<void>;
}
