import { db } from '../../../db/database.js';
import { checkError } from '../../../utils/checkError.js';
import { BaseError } from '../../../utils/BaseError.js';
import { Word } from '../models/models.js';
import { Result } from '../../../utils/Result.js';

async function getWords(language_code?: string): Promise<Result<Word[]>> {
  const query = db
    .selectFrom('word')
    .selectAll()
    .$if(language_code !== undefined, (builder) => {
      return builder.where('word.language_code', '=', language_code!);
    });

  try {
    const result = await query.execute();
    return { data: result };
  } catch (e) {
    const error = checkError(e);
    return { error };
  }
}

async function getWord(id: number): Promise<Result<Word>> {
  try {
    const result = await db.selectFrom('word').selectAll().where('word.word_id', '=', id).executeTakeFirst();
    if (result === undefined) {
      const error = new BaseError('Could not find word: ' + id);
      return { error };
    } else {
      return { data: result };
    }
  } catch (e) {
    const error = checkError(e);
    return { error };
  }
}

async function insertWord(words: Word[]): Promise<Result<Word[]>> {
  try {
    const result = await db.insertInto('word').values(words).returningAll().execute();
    if (result === undefined) {
      const error = new BaseError('Could not insert word.');
      return { error };
    } else {
      return { data: result };
    }
  } catch (e) {
    const error = checkError(e);
    return { error };
  }
}

async function updateWord(data: Word): Promise<Result<Word[]>> {
  try {
    const result = await db
      .updateTable('word')
      .set({
        word_text: data.word_text,
        language_code: data.language_code,
      })
      .where('word_id', '=', data.word_id)
      .returningAll()
      .execute();
    return { data: result };
  } catch (e) {
    const error = checkError(e);
    return { error };
  }
}

async function deleteWord(id: number): Promise<Result<Word[]>> {
  try {
    const result = await db.deleteFrom('word').where('word.word_id', '=', id).returningAll().execute();
    return {
      data: result,
    };
  } catch (e) {
    const error = checkError(e);
    return { error };
  }
}

export { getWords as findWords, getWord as findWord, insertWord, updateWord, deleteWord };
