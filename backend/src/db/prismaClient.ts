import { PrismaClient } from "@prisma/client";
export const db = new PrismaClient();

export async function testDbConnection() {
    try {
        let language = await db.language.findFirst();
        if (language) {
            console.log("Db connection successful");
        } else {
            console.log(`Error connecting to db`);
        }
    } catch (e) {
        console.log(`Error connecting to db \n Error: ${e}`);
    }
}
