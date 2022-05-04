import { ICustomerCommands } from '.';
import { db } from '../../connection';
import { ICustomer } from '../../models/customer';
export default class CustomerCommands implements ICustomerCommands {
  constructor() {}
  create(customer: ICustomer): Promise<number[]> {
    return db('customer').insert(customer);
  }
  update(customer: ICustomer): Promise<number[]> {
    return db('customer').upsert(customer);
  }
  delete(id: string): Promise<number[]> {
    return db('customer').where({ id }).del();
  }
}
