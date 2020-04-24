import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("users").insert([
        {
          nid: "138472850287872955028",
          salary: 1000,
          job: "seller",
          name: "Jane Doe",
          email: "jadoe@gmail.com",
          phone: "250739927472",
          password:
            "$2b$12$2JiR2JiGFHodLlbf1ehV7OZYfqNZZG3ppMJPmerXXngqrBGNJrHQS",
        },
        {
          nid: "238472850287562955028",
          salary: 2000,
          job: "seller",
          name: "John Doe",
          email: "jdoe@gmail.com",
          phone: "250783927472",
          password:
            "$2b$12$2JiR2JiGFHodLlbf1ehV7OZYfqNZZG3ppMJPmerXXngqrBGNJrHQS",
        },
        {
          nid: "338472850287572055028",
          salary: 3000,
          job: "seller",
          name: "Anitta Doe",
          email: "anndoe@gmail.com",
          phone: "250789927480",
          password:
            "$2b$12$2JiR2JiGFHodLlbf1ehV7OZYfqNZZG3ppMJPmerXXngqrBGNJrHQS",
        },
      ]);
    });
}
