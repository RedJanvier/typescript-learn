import db from "../database/setup";

const all = "*";
export default {
  bills: {
    getAll: async () => await db.select(all).from("bills"),
  },
  users: {
    getAll: async () => await db.select(all).from("users"),
  },
};
