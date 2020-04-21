import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex("bills")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("bills").insert([
        {
          owner_id: 1,
          details: "rowValue1",
          title: "Bill 1",
          amount: 2000,
        },
        {
          owner_id: 1,
          details: "rowValue2",
          title: "Bill 2",
          amount: 3329000,
        },
        {
          owner_id: 2,
          details: "rowValue3",
          title: "Bill 1 from user 2",
          amount: 48100,
        },
      ]);
    });
}
