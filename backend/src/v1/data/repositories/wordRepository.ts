import { Word, db } from '../../../db/database.js';
import { checkError } from '../../../utils/checkError.js';
import { BaseError } from '../../../utils/BaseError.js';

async function getWords(language_code?: string) {
  const query = db
    .selectFrom('word')
    .selectAll()
    .$if(language_code !== undefined, (builder) => {
      return builder.where('word.language_code', '=', language_code!);
    });

  try {
    const result = await query.execute();
    return { success: true, result };
  } catch (e) {
    const error = checkError(e);
    return { success: false, error };
  }
}

async function getWord(id: number) {
  try {
    const result = await db.selectFrom('word').selectAll().where('word.word_id', '=', id).executeTakeFirst();
    if (result === undefined) {
      const error = new BaseError('Could not find word: ' + id);
      return { success: false, error };
    } else {
      return { success: true, result };
    }
  } catch (e) {
    const error = checkError(e);
    return { success: false, error };
  }
}

async function insertWord(data: Word) {
  try {
    const result = await db
      .insertInto('word')
      .values({
        word_text: data.word_text,
        language_code: data.language_code,
      })
      .returning(['word_id', 'word_text', 'language_code'])
      .executeTakeFirst();
    if (result === undefined) {
      const error = new BaseError('Could not insert word.');
      return { success: false, error };
    } else {
      return {
        success: true,
        result: {
          insertedRows: result,
        },
      };
    }
  } catch (e) {
    const error = checkError(e);
    return { success: false, error };
  }
}

async function updateWord(data: Word) {
  try {
    const result = await db
      .updateTable('word')
      .set({
        word_text: data.word_text,
        language_code: data.language_code,
      })
      .where('word_id', '=', data.word_id)
      .returning(['word_id', 'word_text', 'language_code'])
      .executeTakeFirst();
    return {
      success: true,
      result: {
        updatedRows: result,
      },
    };
  } catch (e) {
    const error = checkError(e);
    return { success: false, error };
  }
}

async function deleteWord(id: number) {
  try {
    const result = await db
      .deleteFrom('word')
      .where('word.word_id', '=', id)
      .returning(['word_id'])
      .executeTakeFirstOrThrow();
    return {
      success: true,
      result: {
        deletedRows: result,
      },
    };
  } catch (e) {
    const error = checkError(e);
    return { success: false, error };
  }
}

export { getWords, getWord, insertWord, updateWord, deleteWord };
