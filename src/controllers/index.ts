import knex from "knex";
import { Request, Response, NextFunction } from "express";

import * as connect from "../database/knexfile";

const env = process.env.NODE_ENV || "development";
const db = knex(connect[env]);

export default {
  getBills: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const bills = await db.select("*").from("bills");
    return res.status(200).json({ success: true, data: bills });
  },
};
