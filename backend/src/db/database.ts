import { Kysely, PostgresDialect } from "kysely";
import { pool } from "./dbconfig";
import { Database } from "./types";
export async function testDbConnection() {
    const res = await pool.query('SELECT NOW()');
    if (res) {
        console.log("DB connection succeeded.");
    } else {
        throw Error("DB connection failed.");
    }
}

const dialect = new PostgresDialect({ pool: pool });

export const db = new Kysely<Database>({
    dialect,
});