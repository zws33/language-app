import { InsertResult } from "kysely";
import { db } from "../../../db/database";

type Language = {
    language_code: string;
}
type GetLanguage = (languageCode: string) => Promise<Language[]>;
type InsertLanguage = (languageCode: string) => Promise<InsertResult[]>;
export const getLanguage: GetLanguage = async (languageCode) => {
    return await db.selectFrom('language').selectAll().execute();
}

export const insertLanguage: InsertLanguage = async (languageCode) => {
    return await db.insertInto('language').values({ language_code: languageCode }).execute();
}
