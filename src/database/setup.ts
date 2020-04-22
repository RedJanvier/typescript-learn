import knex from "knex";
import * as connect from "../database/knexfile";

const env = process.env.NODE_ENV || "development";
const db = knex(connect[env]);

export default db;
