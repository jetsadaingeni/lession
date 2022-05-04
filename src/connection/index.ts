import knex from 'knex';
import dotenv from 'dotenv';
dotenv.config();

const connection = {
  host: process.env.MYSQL_HOST,
  port: 3306,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};
export const db = knex({
  client: 'mysql2',
  version: '5.7',
  connection: connection,
});
