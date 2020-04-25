import db from "../database/setup";

const all = "*";
interface User {
  nid: string;
  job: string;
  name: string;
  phone: string;
  email: string;
  salary: number;
  password: string;
}
interface Bill {
  owner_id: number;
  amount: number;
  details?: string;
  title: string;
}
export default {
  bills: {
    getAll: async () => await db.select(all).from("bills"),
    create: async (inputBill: Bill) =>
      await db("bills").insert(inputBill).returning(all),
    getSingle: async (conditions: object) =>
      await db("bills").select(all).where(conditions),
  },
  users: {
    getAll: async () => await db.select(all).from("users"),
    getSingle: async (conditions: object) =>
      await db("users").select(all).where(conditions),
    create: async (inputUser: User) =>
      await db("users").insert(inputUser).returning(all),
    verify: async (email: string) =>
      await db("users")
        .where("email", email)
        .update({ verified: true, updated_at: new Date().toISOString() }),
    delete: async (email: string) =>
      await db("users").where("email", email).del().returning("email"),
  },
};
