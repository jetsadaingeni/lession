import { ICustomerManager } from '.';
import { IRegisterClass } from '../../awilixSetup';
import { ICustomerDTO } from '../../controllers/customer';
import { ICustomer } from '../../models/customer';
import { ICustomerCommands, ICustomerQueries } from '../../repositories/customer';

export class CustomerManager implements ICustomerManager {
  customerCommands: ICustomerCommands;
  customerQueries: ICustomerQueries;
  constructor({ customerCommands, customerQueries }: IRegisterClass) {
    this.customerCommands = customerCommands;
    this.customerQueries = customerQueries;
  }

  async getAll(): Promise<ICustomerDTO[]> {
    try {
      const res = await this.customerQueries.getAll();
      return res.map((x) => {
        const convertData = { ...x, zipCode: x.zip_code, custName: x.cust_name };
        const { zip_code, cust_name, ...rest } = convertData;
        return rest;
      });
    } catch (err) {
      throw err;
    }
  }

  async create(customer: ICustomerDTO): Promise<ICustomer> {
    try {
      function padLeadingZeros(num, size) {
        var s = num + '';
        while (s.length < size) s = '0' + s;
        return s;
      }
      const convertData = { ...customer, zip_code: customer.zipCode, cust_name: customer.custName };
      const { zipCode, custName, ...rest } = convertData;
      const maxId: string | undefined = await this.customerQueries.getMaxId();
      const nyy = parseInt(new Date().getFullYear().toString().substring(2));
      let id: string = undefined;
      if (maxId) {
        const yy = parseInt(maxId.substring(0, 2));
        if (yy < nyy) {
          id = nyy + '001';
        } else {
          id = yy + padLeadingZeros(parseInt(maxId.substring(2)) + 1, 3);
        }
      } else {
        id = nyy + '001';
      }
      await this.customerCommands.create({ ...rest, id: id });
      return { ...rest, id: id };
    } catch (err) {
      throw err;
    }
  }

  async update(customer: ICustomerDTO): Promise<void> {
    try {
      const res = await this.customerQueries.getById(customer.id);
      const convertData = { ...customer, zip_code: customer.zipCode, cust_name: customer.custName };
      const { zipCode, custName, ...rest } = convertData;
      if (res) await this.customerCommands.update(rest);
      else throw new Error("Customer doesn't exist");
    } catch (err) {
      throw err;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const res = await this.customerQueries.getById(id);
      if (res) await this.customerCommands.delete(id);
      else throw new Error("Customer doesn't exist");
    } catch (err) {
      throw err;
    }
  }
}
