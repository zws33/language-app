import { pool } from "./dbconfig";
export async function testDb() {
    try {
        const res = await pool.query('SELECT NOW()');
        if (res) {
            console.log("DB connection succeeded.");
        } else {
            console.log("DB connection failed.");
        }
    } catch (error) {
        console.log(`DB connection failed: ${error}`);
    }
}