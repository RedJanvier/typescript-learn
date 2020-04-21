import knex from "knex";
import { Request, Response, NextFunction } from "express";

import * as connect from "../database/knexfile";

const env = process.env.NODE_ENV || "development";
const db = knex(connect[env]);

interface User {
  nid: string;
  salary: number;
  job: string;
  name: string;
  email: string;
  phone: string;
}

export default {
  createUser: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const inputUser: User = {
        ...req.body,
      };
      const createdUser = await db("users").insert(inputUser).returning("*");
      return res.status(200).json({ success: true, data: createdUser });
    } catch (error) {
      console.log(`❌ Error: ${error.message}`.red.bold);
      return res.status(500).json({ success: false, data: null, error: error });
    }
  },
};
