import { Request, Response, NextFunction } from 'express';
import { IResponseDTO } from '../../models/request';
import { deleteCustomer, getCustomers, newCustomer } from './customerController';

export interface ICustomerDTO {
  id: string;
  custName: string;
  address1: number;
  address2: string;
  province: string;
  district: string;
  zipCode: string;
}

export type IcustomerController = typeof customerController;
export const customerController = {
  getCustomers: getCustomers,
  newCustomer: newCustomer,
  deleteCustomer: deleteCustomer,
};