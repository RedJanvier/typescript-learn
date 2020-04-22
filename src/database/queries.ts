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
export default {
  bills: {
    getAll: async () => await db.select(all).from("bills"),
  },
  users: {
    getAll: async () => await db.select(all).from("users"),
    create: async (inputUser: User) => await db("users").insert(inputUser),
  },
};
