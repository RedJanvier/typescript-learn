import { Request, Response } from "express";

import validate from "../utils/validate";
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
  createUser: async (req: Request, res: Response): Promise<any> => {
    try {
      const { email, nid, phone } = req.body;
      if (!validate.email(email)) throw new Error("Email is invalid");
      if (!validate.phone(phone)) throw new Error("Phone must be Rwandan");
      if (!validate.nid(nid)) throw new Error("NID must be Rwanda");

      const createdUser = await users.create(req.body);

      if (!createdUser[0]) throw new Error("User not created");
      console.log(`New user: ${createdUser[0].email} just signed up`.blue.bold);
      return res.status(201).json({ success: true, data: createdUser[0] });
    } catch (error) {
      console.log(`❌ Error in signup: ${error.message}`.red.bold);
      return res.status(500).json({
        success: false,
        data: null,
        error: error.message,
      });
    }
  },
};
