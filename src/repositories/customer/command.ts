import { ICustomerCommands } from '.';
import { db } from '../../connection';
import { ICustomer } from '../../models/customer';
export default class CustomerCommands implements ICustomerCommands {
  constructor() {}
  create(customer: ICustomer): Promise<number[]> {
    return db('customer').insert(customer);
  }
  update(customer: ICustomer): Promise<number[]> {
    const data = { ...customer, id: undefined };
    return db('customer').where({ id: customer.id }).update(data);
  }
  delete(id: string): Promise<number[]> {
    return db('customer').where({ id }).del();
  }
}
