// import { ICustomerDTO } from '../controllers/customer';

import { ICustomerDTO } from '../controllers/customer';
import { ResponseSuccess, ResponseSuccessData } from '../models/request';

const swaggerAutogen = require('swagger-autogen')();

const customerIDO: ICustomerDTO = {
  id: '210001',
  custName: 'Suzy Queue',
  address1: '4455 Landing',
  address2: 'Lange, APT 4',
  province: 'Louisville',
  district: 'KY',
  zipCode: '40018',
};
const { id, ...customerIDONoID } = customerIDO;
const deleteCustomerReq = { id: '210001' };
const doc = {
  info: {
    version: '', // by default: '1.0.0'
    title: '', // by default: 'REST API'
    description: '', // by default: ''
  },
  host: '', // by default: 'localhost:3000'
  basePath: '', // by default: '/'
  schemes: [], // by default: ['http']
  consumes: [], // by default: ['application/json']
  produces: [], // by default: ['application/json']
  tags: [
    // by default: empty Array
    {
      name: '', // Tag name
      description: '', // Tag description
    },
    // { ... }
  ],
  securityDefinitions: {}, // by default: empty object (Swagger 2.0)
  definitions: {
    customerIDOObj: customerIDO,
    customerIDO: [customerIDO],
    customerIDONoID: customerIDONoID,
    deleteCustomerReq: deleteCustomerReq,
    responseSuccessDataCustomerIDO: { success: 'Create customer success', data: customerIDO },
    responseSuccessCustomerIDO: { success: 'Delete customer success' },
  }, // by default: empty object
  components: {}, // by default: empty object (OpenAPI 3.x)
};

const outputFile = './src/swagger/swagger-output.json';
const endpointsFiles = ['./src/routes/index.ts'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as: index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
