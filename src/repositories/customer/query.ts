import { ICustomerQueries } from '.';
import { db } from '../../connection';
import { ICustomer } from '../../models/customer';

export default class CustomerQueries implements ICustomerQueries {
  constructor() {}

  getAll(): Promise<ICustomer[]> {
    return db.select<ICustomer>('*').from('customer');
  }

  getById(id: number): Promise<ICustomer> {
    const res = db.select<ICustomer[]>('*').from('customer').where({ id });
    if (res) {
      return res[0];
    } else {
      return null;
    }
  }

  async getMaxId(): Promise<string | undefined> {
    const res = await db.select<ICustomer[]>('id').from('customer').orderBy('id', 'desc');
    if (res.length > 0) {
      return res[0].id;
    } else {
      return undefined;
    }
  }
}
