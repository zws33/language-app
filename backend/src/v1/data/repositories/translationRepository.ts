import { db } from '../../../db/database.js';
import { Result } from '../../../utils/Result.js';
import { checkError } from '../../../utils/checkError.js';
import { Word, Translation } from '../models/models.js';

export async function findTranslations(words: string[]): Promise<Result<Word[]>> {
  try {
    const result = await db
      .selectFrom('word as w1')
      .innerJoin('translation as t', 'w1.word_id', 't.first_word_id')
      .innerJoin('word as w2', 't.second_word_id', 'w2.word_id')
      .where('w1.word_text', 'in', words)
      .select(['w2.word_id', 'w2.word_text', 'w2.language_code'])
      .execute();
    return { data: result };
  } catch (e) {
    return { error: checkError(e) };
  }
}

export async function insertTranslation(
  translations: { first_word_id: number; second_word_id: number }[],
): Promise<Result<Translation[]>> {
  try {
    const result = await db.insertInto('translation').values(translations).returningAll().execute();
    return { data: result };
  } catch (e) {
    return { error: checkError(e) };
  }
}
