import { PrismaClient } from "@prisma/client";
const Prisma = new PrismaClient()

export async function testDbConnection() {
    try {
        let language = await Prisma.language.findFirst();
        if (language) {
            console.log("Db connection successful");
        } else {
            console.log(`Error connecting to db`)
        }
    } catch (e) {
        console.log(`Error connecting to db \n Error: ${e}`)
    }
}

export default Prisma