// Update with your config settings.
import path from "path";
import { config } from "dotenv";
require("ts-node/register");
config({ path: path.resolve(__dirname, "../../.env") });

module.exports = {
  development: {
    client: "postgres",
    connection: process.env.DB,
    migrations: {
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },

  test: {
    client: "postgres",
    connection: process.env.DB,
    migrations: {
      directory: "./test/migrations",
    },
    seeds: {
      directory: "./test/seeds",
    },
  },
};
