import { ICustomerQueries } from '.';
import { db } from '../../connection';
import { ICustomer } from '../../models/customer';

export default class CustomerQueries implements ICustomerQueries {
  constructor() {}

  async getAll(): Promise<ICustomer[]> {
    const res = await db
      .select<ICustomer[]>('*')
      .fromRaw('(select * from customer order by id asc) as customer');
    return res;
  }

  async getById(id: string): Promise<ICustomer> {
    const res = await db.select<ICustomer[]>('*').from('customer').where({ id });
    if (res) {
      return res[0];
    } else {
      return undefined;
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
