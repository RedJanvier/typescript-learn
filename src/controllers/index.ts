import { Request, Response } from "express";

import queries from "../database/queries";

const { bills, users } = queries;
export default {
  getBills: async (req: Request, res: Response): Promise<any> => {
    const fetchedBills = await bills.getAll();
    return res.status(200).json({ success: true, data: fetchedBills });
  },
  listUsers: async (req: Request, res: Response): Promise<any> => {
    try {
      const fetchedUsers = await users.getAll();
      res.status(200).json({ success: true, data: fetchedUsers });
    } catch (error) {
      console.log(`❌ Error: ${error.message}`.red.bold);
      res.status(500).json({ success: false, data: null, error: error });
    }
  },
};
