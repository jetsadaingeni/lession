import { asClass, createContainer, InjectionMode } from 'awilix';
import CustomerCommands from './repositories/customer/command';
import CustomerQueries from './repositories/customer/query';
import { CustomerManager } from './services/customer/customeManager';

import { ICustomerCommands, ICustomerQueries } from './repositories/customer';
import { ICustomerManager } from './services/customer';

export interface IRegisterClass {
  customerManager: ICustomerManager;
  customerQueries: ICustomerQueries;
  customerCommands: ICustomerCommands;
}
export const awilixContainer = createContainer<IRegisterClass>({
  injectionMode: InjectionMode.PROXY,
});

export async function awilixSetUp() {
  awilixContainer.createScope();
  awilixContainer.register({
    customerCommands: asClass(CustomerCommands),
    customerQueries: asClass(CustomerQueries),
    customerManager: asClass(CustomerManager),
  });
}
