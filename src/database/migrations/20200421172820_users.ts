import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return await knex.schema.createTable("bills", (table: Knex.TableBuilder) => {
    table.increments("id").primary();
    table.integer("owner_id").references("id").inTable("users").notNullable();
    table.string("title").notNullable();
    table.string("details");
    table.integer("amount").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<any> {
  return await knex.schema.dropTable("bills");
}
