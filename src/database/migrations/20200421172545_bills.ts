import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return await knex.schema.createTable("users", (table: Knex.TableBuilder) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("job").notNullable();
    table.string("password").notNullable();
    table.string("nid").notNullable().unique();
    table.string("phone").notNullable().unique();
    table.string("email").notNullable().unique();
    table.integer("salary").notNullable();
    table.boolean("verified").defaultTo(false);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at");
  });
}

export async function down(knex: Knex): Promise<any> {
  return await knex.schema.dropTable("users");
}
