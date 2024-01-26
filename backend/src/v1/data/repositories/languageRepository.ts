import { db } from '../../../db/database';

export async function getLanguages() {
  try {
    const result = await db.selectFrom('language').selectAll().execute();
    return { success: true, result };
  } catch (e) {
    return { success: false, error: e };
  }
}

export async function insertLanguage(languageCode: string) {
  try {
    const result = await db
      .insertInto('language')
      .values({ language_code: languageCode })
      .returning('language.language_code')
      .execute();
    return { success: true, result };
  } catch (e) {
    return { success: false, error: e };
  }
}
