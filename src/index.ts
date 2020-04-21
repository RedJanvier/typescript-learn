import knex from "knex";
import { config } from "dotenv";
import express, { Request, Response, NextFunction } from "express";

import * as connect from "./database/knexfile";

config();
const env = process.env.NODE_ENV || "development";
const db = knex(connect[env]);

const app = express();
const PORT = process.env.PORT || 4000;

app.get("/", (req: Request, res: Response, next: NextFunction): void => {
  res.status(200).json({ message: "Hello World" });
});

app.listen(PORT, () =>
  console.log(`Server started at http://localhost:${PORT}/`)
);
