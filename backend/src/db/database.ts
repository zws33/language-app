import { Kysely, PostgresDialect } from "kysely";
import { pool } from "./dbconfig";
import { DB } from "kysely-codegen";

export async function testDbConnection() {
  const res = await pool.query("SELECT NOW()");
  if (res) {
    console.log("DB connection succeeded.");
  } else {
    throw Error("DB connection failed.");
  }
}

const dialect = new PostgresDialect({ pool });

export const db = new Kysely<DB>({
  dialect,
});
