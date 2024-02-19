import { db } from '../../../db/database.js';
import { checkError } from '../../../utils/checkError.js';
import { BaseError } from '../../../utils/BaseError.js';
import { Word } from '../models/models.js';
import { Result } from '../../../utils/Result.js';

async function findWords(language_code?: string, text?: string): Promise<Result<Word[]>> {
  const query = db
    .selectFrom('word')
    .selectAll()
    .$if(language_code !== undefined, (builder) => {
      return builder.where('word.language_code', '=', language_code!);
    })
    .$if(text !== undefined, (builder) => {
      return builder.where('word.word_text', '=', text!);
    });

  try {
    const result = await query.execute();
    return { data: result };
  } catch (e) {
    const error = checkError(e);
    return { error };
  }
}

async function findWordById(id: number): Promise<Result<Word>> {
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

async function insertWord(words: { word_text: string; language_code: string }[]): Promise<Result<Word[]>> {
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

export { findWords, findWordById, insertWord, updateWord, deleteWord };
