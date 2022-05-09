import express from 'express';
import { customerController } from '../controllers/customer';
import { checkReqCustomerBody } from '../middlewares/customer';
const routes = express.Router();
routes.get('/', (req, res, next) => {
  res.send('Hello World!');
});
//customer
routes.get('/customer', customerController.getCustomers);
routes.post('/customer', checkReqCustomerBody, customerController.newCustomer);
routes.delete('/customer/:id', customerController.deleteCustomer);
routes.put('/customer/:id', customerController.updateCustomer);
export default routes;
