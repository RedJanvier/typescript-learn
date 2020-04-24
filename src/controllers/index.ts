import { Request, Response } from "express";

import emailUtils from "../utils/email";
import validate from "../utils/validate";
import queries from "../database/queries";
import {
  verifyToken,
  signToken,
  encryptPassword,
  decryptPassword,
} from "../utils/auth";

const { bills, users } = queries;
export default {
  test: (req: Request, res: Response): Response<any> =>
    res.status(200).json({ success: true, data: "Hello World" }),
  listBills: async (req: Request, res: Response): Promise<any> => {
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
      const { email, nid, phone, password } = req.body;
      if (!validate.email(email)) throw new Error("Email is invalid");
      if (!validate.phone(phone)) throw new Error("Phone must be Rwandan");
      if (!validate.nid(nid)) throw new Error("NID must be Rwanda");

      const createdUser = await users.create({
        ...req.body,
        password: await encryptPassword(password),
      });

      if (!createdUser[0]) throw new Error("User not created");
      console.log(`New user: ${createdUser[0].email} just signed up`.blue.bold);
      emailUtils.sendVerificationMail(createdUser[0].email);
      return res.status(201).json({
        success: true,
        data: {
          message: `Check your email(${createdUser[0].email}) for account verification`,
        },
      });
    } catch (error) {
      console.log(`❌ Error in signup: ${error.message}`.red.bold);
      return res.status(500).json({
        success: false,
        data: null,
        error: error.message,
      });
    }
  },
  verify: async (req: Request, res: Response): Promise<any> => {
    const { token } = req.params;
    try {
      const data = verifyToken({
        token,
        secret: process.env.JWT_SECRET!,
      });

      if (data.deny) {
        // Delete user with email data.email
        const email = await users.delete(data.email);
        return res.status(200).json({
          success: true,
          data: `Registration Canceled successfully for ${email}!`,
        });
      }
      const verified = await users.verify(data.email);

      if (!verified) throw new Error("User not verified!");
      return res.status(200).json({
        success: true,
        data: `${data.email} was successfully verified and can now login`,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        data: `Email failed to verify!`,
      });
    }
  },
  login: async (req: Request, res: Response): Promise<any> => {
    try {
      const { email, password } = req.body;
      if (!validate.email(email)) throw new Error("Email is not valid!");
      if (password.length < 1 || email.length < 1)
        throw new Error("Email & Password must be provided!");

      const [user] = await users.getSingle({ email, verified: true });
      // compare password with saved one
      const isValid = await decryptPassword({
        password,
        hashed: (<any>user).password,
      });
      console.log(isValid);
      if (!isValid) throw new Error("Email or Passowrd is not valid!");
      const loginData = {
        name: (<any>user).name,
        id: (<any>user).id,
      };
      const loginToken = signToken({
        data: loginData,
        duration: "3h",
        secret: process.env.JWT_SECRET!,
      });
      return res.status(200).json({
        success: true,
        data: { token: loginToken, message: "The token is valid for 3h" },
      });
    } catch (error) {
      console.log(`❌ Error in login: ${error.message}`.red.bold);
      return res.status(500).json({
        success: false,
        data: null,
        error: error.message,
      });
    }
  },
};
