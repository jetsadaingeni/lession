import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('customer', (table) => {
    table.string('id', 5).primary();
    table.string('cust_name', 255).notNullable();
    table.string('address1', 255).nullable();
    table.string('address2', 255).nullable();
    table.string('province', 255).nullable();
    table.string('district', 255).nullable();
    table.string('zip_code', 255).nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('customer');
}

exports.config = { transaction: false };
