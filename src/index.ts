import knex from "knex";
import path from "path";
import { config } from "dotenv";
import express, { Request, Response, NextFunction } from "express";

import * as connect from "./database/knexfile";

config({ path: path.resolve(__dirname, "../.env") });
const env = process.env.NODE_ENV || "development";
const db = knex(connect[env]);

const app = express();
const PORT = process.env.PORT;

app.get(
  "/",
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const bills = await db.select("*").from("bills");
    res.status(200).json({ success: true, data: bills });
  }
);

app.listen(PORT, () =>
  console.log(`Server started at http://localhost:${PORT}/`)
);
