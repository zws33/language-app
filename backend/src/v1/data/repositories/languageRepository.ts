import { Language, db } from '../../../db/database';
import { Result } from '../../../utils/Result';
import { checkError } from '../../../utils/checkError';

export async function getLanguages(): Promise<Result<Language[]>> {
  try {
    const result = await db.selectFrom('language').selectAll().execute();
    return { data: result };
  } catch (e) {
    const error = checkError(e);
    return { error };
  }
}

export async function insertLanguage(languageCode: string[]): Promise<Result<Language[]>> {
  try {
    const result = await db
      .insertInto('language')
      .values(languageCode.map((code) => ({ language_code: code })))
      .returningAll()
      .execute();
    return { data: result };
  } catch (e) {
    return { error: checkError(e) };
  }
}
