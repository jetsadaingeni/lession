import express from 'express';
import { customerController } from '../controllers/customer';
import { checkReqCustomerBody } from '../middlewares/customer';
const routes = express.Router();
routes.get('/', (req, res, next) => {
  res.send('Hello World!');
});
//customer
routes.get('/customer/getall', customerController.getCustomers);
routes.post('/customer/newCustomer', checkReqCustomerBody, customerController.newCustomer);
routes.post('/customer/deleteCustomer', customerController.deleteCustomer);
export default routes;
