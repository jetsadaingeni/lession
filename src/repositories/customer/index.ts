import { ICustomer } from '../../models/customer';

export interface ICustomerQueries {
  getAll(): Promise<ICustomer[]>;
  getById(id: string): Promise<ICustomer>;
  getMaxId(): Promise<string | undefined>;
}

export interface ICustomerCommands {
  create(customer: ICustomer): Promise<number[]>;
  update(customer: ICustomer): Promise<number[]>;
  delete(id: string): Promise<number[]>;
}
