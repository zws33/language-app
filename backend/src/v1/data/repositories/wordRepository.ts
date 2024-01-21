import { db } from "../../../db/database";

export const getWords = async (languageCode: string | null = null) => {
  const query = db.selectFrom("word").selectAll();
  if (languageCode != null) {
    query.where("language_code", "=", languageCode);
  }
  const result = await query.execute();
  return result.map((entity) => {
    return {
      id: entity.word_id,
      text: entity.word_text,
      languageCode: entity.language_code,
    };
  });
};

export const getWord = async (id: number) => {
  const data = await db
    .selectFrom("word")
    .selectAll()
    .where("word.word_id", "=", id)
    .executeTakeFirstOrThrow();

  return {
    id: data.word_id,
    text: data.word_text,
    languageCode: data.language_code,
  };
};

export const insertWord = async (data: WordInsert) => {
  const query = db.insertInto("word").values({
    word_text: data.text,
    language_code: data.languageCode,
  });
  const result = await query.executeTakeFirstOrThrow();
  return { insertedRows: result.numInsertedOrUpdatedRows?.toString() ?? "0" };
};

export const updateWord = async (data: WordUpdate) => {
  const query = db
    .updateTable("word")
    .set({
      word_text: data.text,
      language_code: data.languageCode,
    })
    .where("word_id", "=", data.id);
  db.updateTable;
  const result = await query.executeTakeFirstOrThrow();
  return { updatedRows: result.numUpdatedRows.toString() };
};

export const deleteWord = async (id: number) => {
  const query = db.deleteFrom("word").where("word.word_id", "=", id);
  const result = await query.executeTakeFirstOrThrow();
  return {
    deletedRowsCount: result.numDeletedRows.toString(),
  };
};

export type WordInsert = {
  text: string;
  languageCode: string;
};

export type WordUpdate = {
  id: number;
  text: string;
  languageCode: string;
};
