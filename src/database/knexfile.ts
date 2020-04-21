// Update with your config settings.
require("ts-node/register");
import { config } from "dotenv";

config();

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
