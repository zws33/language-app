import { db } from '../../../db/database.js';
import { Result } from '../../../utils/Result.js';
import { checkError } from '../../../utils/checkError.js';
import { Word } from '../models/models.js';

export async function findTranslations(words: string[]): Promise<Result<Word[]>> {
  try {
    const result = await db
      .selectFrom('word as w1')
      .innerJoin('translation as t', 'w1.word_id', 't.word_id_1')
      .innerJoin('word as w2', 't.word_id_2', 'w2.word_id')
      .where('w1.word_text', 'in', words)
      .select(['w2.word_id', 'w2.word_text', 'w2.language_code'])
      .execute();
    return { data: result };
  } catch (e) {
    return { error: checkError(e) };
  }
}

export type InsertWord = {
  word_text: string;
  language_code: string;
};

export type TranslationInsertResult = {
  translation_id: number;
  first_word: Word;
  second_word: Word;
};

export async function insertTranslationByWords(
  words: [InsertWord, InsertWord],
): Promise<Result<TranslationInsertResult>> {
  try {
    return await db.transaction().execute(async (trx) => {
      const firstWord = await trx.insertInto('word').values(words[0]).returningAll().executeTakeFirstOrThrow();
      const secondWord = await trx.insertInto('word').values(words[1]).returningAll().executeTakeFirstOrThrow();
      const translation = await trx
        .insertInto('translation')
        .values({ word_id_1: firstWord.word_id, word_id_2: secondWord.word_id })
        .returningAll()
        .executeTakeFirstOrThrow();
      const result: TranslationInsertResult = {
        translation_id: translation.translation_id,
        first_word: firstWord,
        second_word: secondWord,
      };
      return { data: result };
    });
  } catch (e) {
    return { error: checkError(e) };
  }
}
