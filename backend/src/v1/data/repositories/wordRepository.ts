import { DeleteResult, InsertResult, UpdateResult } from 'kysely';
import { db } from '../../../db/database.js';

type InsertData = {
  text: string;
  language_code: string;
};

type UpdateData = {
  id: number;
  text: string;
  languageCode: string;
};

async function getWords(languageCode?: string) {
  const query = db
    .selectFrom('word')
    .selectAll()
    .$if(languageCode !== undefined, (builder) => {
      return builder.where('word.language_code', '=', languageCode!);
    });

  try {
    return await query.execute();
  } catch (error) {
    if (typeof error === 'string') {
      throw new Error(error);
    } else if (error instanceof Error) {
      throw new Error(error.message);
    }
    return [];
  }
}

async function getWord(id: number) {
  const data = await db.selectFrom('word').selectAll().where('word.word_id', '=', id).executeTakeFirst();
  if (!data) {
    throw new Error(`Word with id ${id} not found`);
  }
  return data;
}

async function insertWord(data: InsertData) {
  const query = db
    .insertInto('word')
    .values({
      word_text: data.text,
      language_code: data.language_code,
    })
    .returning(['word_id', 'word_text', 'language_code']);
  const result = await query.executeTakeFirstOrThrow();
  return { insertedRow: result };
}

async function updateWord(data: UpdateData) {
  const query = db
    .updateTable('word')
    .set({
      word_text: data.text,
      language_code: data.languageCode,
    })
    .where('word_id', '=', data.id)
    .returning(['word_id', 'word_text', 'language_code']);
  const result = await query.executeTakeFirstOrThrow();
  return { updated_rows: result };
}

async function deleteWord(id: number) {
  const query = db.deleteFrom('word').where('word.word_id', '=', id).returning(['word_id']);
  const result = await query.executeTakeFirstOrThrow();
  return {
    delete_word_id: result,
  };
}

export { getWords, getWord, insertWord, updateWord, deleteWord };
